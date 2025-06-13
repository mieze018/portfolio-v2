import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ESMとの互換性を強制
  experimental: {
    forceSwcTransforms: true,
    esmExternals: true,
  },
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

export const config = {
  ...nextConfig,
  ...imageConfig,
}

export default config
