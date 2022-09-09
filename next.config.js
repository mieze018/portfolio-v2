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

module.exports = {
  ...nextConfig,
  ...imageConfig,
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false, path: false }
    return config
  },
}
