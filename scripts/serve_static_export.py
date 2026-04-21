#!/usr/bin/env python3
"""Serve the Next.js static export in ./out with clean URL support."""

from __future__ import annotations

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


class StaticExportHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        parsed_path = unquote(urlparse(path).path)
        clean_path = parsed_path.strip("/")
        if clean_path:
            html_candidate = Path(self.directory) / f"{clean_path}.html"
            if html_candidate.is_file():
                return str(html_candidate)

        candidate = Path(super().translate_path(path))
        if candidate.exists():
            return str(candidate)

        return str(candidate)


def main() -> None:
    parser = argparse.ArgumentParser(description="Preview the static Next.js export.")
    parser.add_argument("--host", default="0.0.0.0", help="Host to bind.")
    parser.add_argument("--port", type=int, default=3000, help="Port to bind.")
    parser.add_argument("--directory", default="out", help="Static export directory.")
    args = parser.parse_args()

    directory = Path(args.directory).resolve()
    if not directory.is_dir():
        raise SystemExit("Missing ./out directory. Run `make build` first.")

    handler = partial(StaticExportHandler, directory=str(directory))
    server = ThreadingHTTPServer((args.host, args.port), handler)

    print(f"Serving {directory} at http://localhost:{args.port}")
    print("Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
