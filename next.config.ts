import type { NextConfig } from 'next'
import type { UserConfig } from 'next-i18next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

const imageConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: '**.tumblr.com',
        pathname: '**',
      },
    ],
  },
}

const i18n: UserConfig['i18n'] = {
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
}

export const config = {
  ...nextConfig,
  ...imageConfig,
  i18n,
  experimental: {
    forceSwcTransforms: true,
  },
}

export default config
