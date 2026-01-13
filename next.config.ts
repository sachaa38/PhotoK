/** @type {import('next').Next.Config} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // On retire trailingSlash pour l'instant pour tester la version par défaut
};

export default nextConfig;