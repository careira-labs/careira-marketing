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
  async redirects() {
    return [
      {
        source: '/data-processing-recruiter',
        destination: '/data-processing-addendum',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
