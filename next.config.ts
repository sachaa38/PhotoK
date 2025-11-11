// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",             // export statique
  // basePath: "/PhotoK",          // nom du repo GitHub
  // assetPrefix: "/PhotoK/",      // pour que CSS/JS soient trouvés
  images: { unoptimized: true }, // pour ne pas utiliser le loader Next.js
};

export default nextConfig;
