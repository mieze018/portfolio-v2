import type { Tumblr } from 'libs/@type/api/tumblr'

type imageTransformType = (source: Tumblr.OriginalSize, width: number) => Promise<string>

// Why: React には生成済みURLだけを渡し、画像変換は Astro のビルド側で行う。
export const optimizePostImages = async (posts: Tumblr.Post[], transform: imageTransformType) => {
  const images = new Map<string, Promise<Tumblr.Photo['optimized']>>()

  const optimize = async (photo: Tumblr.Photo) => {
    const source = photo.original_size
    // Why: GIF のアニメーションや SVG、オフラインfixtureを変換しない。
    if (
      !/^https:\/\/[^/.]+\.media\.tumblr\.com\/.*\.(jpe?g|png|webp)(?:\?.*)?$/i.test(source.url)
    ) {
      return photo
    }
    let image = images.get(source.url)
    if (!image) {
      image = (async () => {
        if (!(source.width > 0 && source.height > 0)) {
          throw new Error('Cannot optimize an image without positive dimensions')
        }
        const maxWidth = Math.min(source.width, 1280)
        const widths = [
          ...new Set([320, 640, 960, maxWidth].filter((width) => width <= maxWidth)),
        ].sort((a, b) => a - b)
        const variants = await Promise.all(
          widths.map(async (width) => ({ width, src: await transform(source, width) }))
        )
        const fallback = variants.find((variant) => variant.width >= 640) ?? variants[0]
        return {
          src: fallback.src,
          srcSet: variants.map(({ src, width }) => `${src} ${width}w`).join(', '),
        }
      })()
      images.set(source.url, image)
    }
    return { ...photo, optimized: await image }
  }

  return Promise.all(
    posts.map(async (post) => ({
      ...post,
      photos: post.photos ? await Promise.all(post.photos.map(optimize)) : post.photos,
    }))
  )
}
