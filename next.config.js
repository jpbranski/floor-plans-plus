/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  webpack: (config) => {
    // Prevent Konva from trying to load the 'canvas' package in SSR builds
    config.resolve.alias['canvas'] = false;
    return config;
  },
}

module.exports = nextConfig
