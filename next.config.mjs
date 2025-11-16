/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reviwes-backend.onrender.com",
      },
    ],
  },
};

export default nextConfig;
