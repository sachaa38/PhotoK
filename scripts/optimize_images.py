#!/usr/bin/env python3
"""
Batch-optimize images for web use while keeping decent visual quality.

Default behavior is safe:
- reads from one or more input directories
- writes optimized copies into a separate output directory
- keeps filenames and relative structure

Examples:
  python3 scripts/optimize_images.py
  python3 scripts/optimize_images.py --input public/images --output optimized-images
  python3 scripts/optimize_images.py --format webp
  python3 scripts/optimize_images.py --in-place --max-dimension 2400
  python3 scripts/optimize_images.py --dry-run

Notes:
- For JPEG/JPG output, the script uses progressive JPEGs with optimization enabled.
- For PNG output, it uses Pillow's PNG optimization. This is lossless but may not reduce
  photo-heavy PNGs as much as JPEG/WebP would.
- For best size savings on photographic assets, use --format webp or --format jpeg.
"""

from __future__ import annotations

import argparse
import shutil
import sys
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageOps


SUPPORTED_EXTS = {".jpg", ".jpeg", ".png", ".webp"}
DEFAULT_INPUTS = [
    "public/images",
]


@dataclass
class FileResult:
    src: Path
    dest: Path
    before_bytes: int
    after_bytes: int
    converted: bool


def human_size(num_bytes: int) -> str:
    units = ["B", "KB", "MB", "GB"]
    size = float(num_bytes)
    for unit in units:
        if size < 1024 or unit == units[-1]:
            return f"{size:.1f}{unit}"
        size /= 1024
    return f"{num_bytes}B"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Optimize images for web delivery.")
    parser.add_argument(
        "--input",
        action="append",
        default=[],
        help="Input directory to scan. May be passed multiple times. Defaults to public/images.",
    )
    parser.add_argument(
        "--output",
        default="optimized-images",
        help="Output directory for optimized copies. Ignored with --in-place.",
    )
    parser.add_argument(
        "--in-place",
        action="store_true",
        help="Replace original files. A .bak backup is created before overwrite.",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=82,
        help="Quality for JPEG/WebP output. Good default: 80-85.",
    )
    parser.add_argument(
        "--max-dimension",
        type=int,
        default=2400,
        help="Resize so the longest side is at most this many pixels.",
    )
    parser.add_argument(
        "--format",
        choices=["keep", "jpeg", "webp"],
        default="keep",
        help="Output format. 'keep' preserves source format/extension.",
    )
    parser.add_argument(
        "--skip-smaller-than",
        type=int,
        default=1200,
        help="Skip resizing when the longest side is already below this many pixels.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be processed without writing files.",
    )
    return parser.parse_args()


def normalized_inputs(raw_inputs: list[str]) -> list[Path]:
    items = [Path(p) for p in (raw_inputs or DEFAULT_INPUTS)]
    return [p for p in items if p.exists()]


def iter_images(input_dir: Path):
    for path in input_dir.rglob("*"):
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTS:
            yield path


def output_path_for(src: Path, root: Path, out_root: Path, fmt: str) -> Path:
    rel = src.relative_to(root)
    if fmt == "keep":
        return out_root / rel
    suffix = ".jpg" if fmt == "jpeg" else ".webp"
    return (out_root / rel).with_suffix(suffix)


def open_and_prepare(src: Path, max_dimension: int, skip_smaller_than: int) -> tuple[Image.Image, bool]:
    with Image.open(src) as im:
        prepared = ImageOps.exif_transpose(im)
        if prepared.mode not in ("RGB", "RGBA"):
            prepared = prepared.convert("RGBA" if "A" in prepared.getbands() else "RGB")

        width, height = prepared.size
        longest_side = max(width, height)
        resized = False

        if longest_side > max_dimension and longest_side >= skip_smaller_than:
            scale = max_dimension / float(longest_side)
            new_size = (max(1, int(width * scale)), max(1, int(height * scale)))
            prepared = prepared.resize(new_size, Image.Resampling.LANCZOS)
            resized = True

        return prepared.copy(), resized


def save_image(image: Image.Image, dest: Path, src_suffix: str, fmt: str, quality: int) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)

    chosen_fmt = fmt
    if chosen_fmt == "keep":
        src_lower = src_suffix.lower()
        if src_lower in {".jpg", ".jpeg"}:
            chosen_fmt = "jpeg"
        elif src_lower == ".webp":
            chosen_fmt = "webp"
        else:
            chosen_fmt = "png"

    if chosen_fmt == "jpeg":
        flattened = image.convert("RGB")
        flattened.save(
            dest,
            format="JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
            subsampling="4:2:0",
        )
        return

    if chosen_fmt == "webp":
        webp_ready = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        webp_ready.save(
            dest,
            format="WEBP",
            quality=quality,
            method=6,
        )
        return

    png_ready = image
    png_ready.save(dest, format="PNG", optimize=True)


def backup_original(path: Path) -> Path:
    backup_path = path.with_suffix(path.suffix + ".bak")
    if not backup_path.exists():
        shutil.copy2(path, backup_path)
    return backup_path


def process_file(
    src: Path,
    input_root: Path,
    args: argparse.Namespace,
) -> FileResult | None:
    dest_root = src.parent if args.in_place else Path(args.output) / input_root.name
    dest = src if args.in_place and args.format == "keep" else output_path_for(src, input_root, dest_root, args.format)
    before_bytes = src.stat().st_size

    if args.dry_run:
        return FileResult(src=src, dest=dest, before_bytes=before_bytes, after_bytes=before_bytes, converted=False)

    prepared, _ = open_and_prepare(src, args.max_dimension, args.skip_smaller_than)

    if args.in_place and dest == src:
        backup_original(src)

    save_image(prepared, dest, src.suffix, args.format, args.quality)
    after_bytes = dest.stat().st_size

    if args.in_place and dest != src:
        backup_original(src)

    return FileResult(
        src=src,
        dest=dest,
        before_bytes=before_bytes,
        after_bytes=after_bytes,
        converted=(dest.suffix.lower() != src.suffix.lower()),
    )


def main() -> int:
    args = parse_args()
    inputs = normalized_inputs(args.input)

    if not inputs:
      print("No valid input directories found.", file=sys.stderr)
      return 1

    all_results: list[FileResult] = []
    skipped = 0

    for input_dir in inputs:
        for src in iter_images(input_dir):
            try:
                result = process_file(src, input_dir, args)
                if result is not None:
                    all_results.append(result)
            except Exception as exc:  # noqa: BLE001
                skipped += 1
                print(f"Skipping {src}: {exc}", file=sys.stderr)

    total_before = sum(item.before_bytes for item in all_results)
    total_after = sum(item.after_bytes for item in all_results)
    saved = total_before - total_after

    print(f"Processed files: {len(all_results)}")
    print(f"Skipped files:   {skipped}")
    print(f"Before:          {human_size(total_before)}")
    print(f"After:           {human_size(total_after)}")
    print(f"Saved:           {human_size(saved)}")

    if args.dry_run:
        print("\nDry run sample:")
        for item in all_results[:10]:
            print(f"- {item.src} -> {item.dest}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
