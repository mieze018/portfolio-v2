/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const imageConfig = {
  images: {
    domains: ['64.media.tumblr.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.tumblr.com',
        pathname: '**',
      },
    ],
  },
}

const i18n = {
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
  },
}

module.exports = {
  ...nextConfig,
  ...imageConfig,
  ...i18n,
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false, path: false }
    return config
  },
}
