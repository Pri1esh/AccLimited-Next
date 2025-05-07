import type { NextConfig } from 'next';

const environment =
  process.env.NEXT_PUBLIC_ENV === 'prod' ? 'prod' : process.env.NEXT_PUBLIC_ENV === 'dev' ? 'dev' : 'stage';
const baseUrl = environment === 'prod' ? 'https://www.acclimited.com' : 'https://uat-s.acclimited.com';
const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: baseUrl, // Using the environment-based URL
        port: '', // usually empty unless you're serving on a custom port
        pathname: '/**', // wildcard to allow all paths
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    if (environment === 'dev') {
      // Don't apply CSP headers in dev environment
      return [];
    }

    return [
      {
        // Applies to all pages
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              connect-src 'self' https://js.monitor.azure.com https://dc.services.visualstudio.com https://www.google-analytics.com https://c.go-mpulse.net https://684d0d43.akstat.io;
              img-src 'self' ${baseUrl} data:;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://use.typekit.net;
              font-src 'self' data: https://fonts.gstatic.com https://use.typekit.net;
              script-src 'self' 'unsafe-inline' 'strict-dynamic' https://www.googletagmanager.com https://s.go-mpulse.net https://www.youtube.com https://www.google.com https://www.gstatic.com https://snap.licdn.com https://bat.bing.com;
              script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://s.go-mpulse.net https://www.youtube.com https://www.google.com https://www.gstatic.com https://snap.licdn.com https://bat.bing.com;
              object-src 'none';
              frame-src 'self' https://www.google.com;`
              .replace(/\s+/g, ' ')
              .trim(), // Remove extra spaces and format CSP string
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://uat-s.acclimited.com',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,PUT,POST,DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
          {
            key: 'Cache-Control',
            value: 'private, no-cache, no-store, must-revalidate',
          },
          {
            key: 'Expires',
            value: '-1',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
