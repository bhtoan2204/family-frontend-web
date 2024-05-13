/** @type {import('next').NextConfig} */
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  // webpack: (config) => {
  //   config.externals.push({
  //     "utf-8-validate": "commonjs utf-8-validate",
  //     bufferutil: "commonjs bufferutil",
  //   });
  //   return config;
  // },
  // reactStrictMode: false,
  images: {
    // domains: [
    //   "cdn-new.topcv.vn",
    //   "cdn.haitrieu.com",
    //   "www.w3schools.com",
    //   "storage.googleapis.com",
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
