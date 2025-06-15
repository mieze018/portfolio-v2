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
  //withTwin と重複するためコメントアウト
  // webpack: (config) => {
  //   // Unset client-side javascript that only works server-side
  //   config.resolve.fallback = { fs: false, module: false, path: false }
  //   return config
  // },
}
