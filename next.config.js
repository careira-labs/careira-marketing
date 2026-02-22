/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize images
  images: {
    formats: ['image/webp'],
  },
  // Disable x-powered-by header
  poweredByHeader: false,
  // Compiler options for styled-jsx
  compiler: {
    styledJsx: true,
  },
};

module.exports = nextConfig;
