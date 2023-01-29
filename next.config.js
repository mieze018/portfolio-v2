const stailwc = require('stailwc/install')

const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const stailwcConfig = {
  experimental: {
    swcPlugins: [stailwc({
      engine: "styled-components",
      wasm: "/home/arlyon/Programming/stailwc/target/wasm32-wasi/release/stailwc.wasm",
    })
    ],
  },
  compiler: { styledComponents: true },
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
  ...stailwcConfig,
  i18n,
}
