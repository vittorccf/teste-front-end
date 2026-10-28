import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  // Permite @use "tokens" / "mixins" em qualquer .module.scss.
  sassOptions: { loadPaths: [path.join(process.cwd(), "src/styles")] },
  images: {
    // Fotos dos produtos vêm do JSON da Econverse.
    remotePatterns: [{ protocol: "https", hostname: "app.econverse.com.br", pathname: "/teste-front-end/**" }],
  },
};

export default nextConfig;
