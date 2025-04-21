/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  assetPrefix: '/finals-assistant/',
  basePath: '/finals-assistant',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 