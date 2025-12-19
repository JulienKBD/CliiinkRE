/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },

    outputFileTracingRoot: __dirname,
    outputFileTracingExcludes: {
      '*': [
        'backend/**',
        'node_modules/**',
      ],
    },
  },
};

module.exports = nextConfig;
