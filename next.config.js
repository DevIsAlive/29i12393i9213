/** @type {import('next').NextConfig} */

// Determine repository name for GitHub Pages
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'webv4';
const basePath = process.env.NODE_ENV === 'production' ? `/${repo}` : '';

const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages
  output: 'export',
  // Set base path for GitHub Pages
  basePath: basePath,
  // Add trailing slash for better GitHub Pages compatibility
  trailingSlash: true,
  // Configure asset prefix
  assetPrefix: basePath,
  // Optimize images for static export
  images: {
    unoptimized: true,
  },
  experimental: {
    esmExternals: false,
  },
  webpack: (config, { isServer }) => {
    // Fix issues with webpack build process
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig 