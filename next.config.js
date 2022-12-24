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
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: boolean | {
      // Enabled by default in development, disabled in production to reduce file size,
      // setting this will override the default for all environments.
      displayName?: boolean,
      // Enabled by default.
      ssr?: boolean,
      // Enabled by default.
      fileName?: boolean,
      // Empty by default.
      topLevelImportPaths?: string[],
      // Defaults to ["index"].
      meaninglessFileNames?: string[],
      // Enabled by default.
      cssProp?: boolean,
      // Empty by default.
      namespace?: string,
      // Not supported yet.
      minify?: boolean,
      // Not supported yet.
      transpileTemplateLiterals?: boolean,
      // Not supported yet.
      pure?: boolean,
    },
  },
})
