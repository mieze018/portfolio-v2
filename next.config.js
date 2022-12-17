const { i18n } = require('./next-i18next.config')
const withTwin = require('./withTwin.js')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const imageConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.tumblr.com',
        pathname: '**',
      },
    ],
  },
}

/** @type {import('next').NextConfig} */
module.exports = withTwin({
  ...nextConfig,
  ...imageConfig,
  i18n,
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false, path: false }
    return config
  },
})
