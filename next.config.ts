/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['cdn.sanity.io','stream.mux.com','ummalqura.com','www.ummalqura.com','dl.dropboxusercontent.com','www.masardestination.com.sa','masardestination.com.sa'],
},
async headers() {
  const contentSecurityPolicy =  `upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: contentSecurityPolicy,
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        {
          key: 'Cross-Origin-Embedder-Policy',
          value: 'unsafe-none',
        },
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'cross-origin',
        },
        {
          key: 'Cross-Origin-Resource-Policy',
          value: 'cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'geolocation=(self), microphone=()',
        },
        {
          key: 'X-Permitted-Cross-Domain-Policies',
          value: 'none',
        }
      ],
    },
  ];
},
  experimental: {
    // Used to guard against accidentally leaking SANITY_API_READ_TOKEN to the browser
    taint: true,
  },
  logging: {
    fetches: { fullUrl: false },
  },
  reactStrictMode: false
};