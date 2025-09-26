/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zandokh.com",
      },
      {
        protocol: "https",
        hostname: "maroon-fantastic-crab-577.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;