/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'russtanner.xyz' }
    ]
  }
};

module.exports = nextConfig;
