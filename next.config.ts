/** @type {import('next').Next.Config} */
const nextConfig = {
  output: "export",
  trailingSlash: false, // ON LE REMET : c'est lui qui crée les dossiers propres
  images: { unoptimized: true },
};
export default nextConfig;