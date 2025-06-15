/* eslint-disable */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
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
module.exports = {
  ...nextConfig,
  ...imageConfig,
  i18n,
  //withTwin と重複するためコメントアウト
  // webpack: (config) => {
  //   // Unset client-side javascript that only works server-side
  //   config.resolve.fallback = { fs: false, module: false, path: false }
  //   return config
  // },
}
