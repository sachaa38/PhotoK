/** @type {import('next').Next.Config} */
const nextConfig = {
  output: "export",
  images: { 
    unoptimized: true 
  },
  // Cette ligne permet à Vercel de trouver /pageMariage/index.html 
  // quand tu tapes /pageMariage dans l'URL
  trailingSlash: true, 
};

export default nextConfig;