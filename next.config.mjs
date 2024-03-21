/** @type {import('next').NextConfig} */
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["cdn-new.topcv.vn","cdn.haitrieu.com","www.w3schools.com"],
  },
  
};

export default nextConfig;
