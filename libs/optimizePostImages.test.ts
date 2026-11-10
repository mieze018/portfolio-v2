import type { Tumblr } from 'libs/@type/api/tumblr'
import { optimizePostImages } from 'libs/optimizePostImages'
import { describe, expect, it, vi } from 'vitest'

const photo = (width = 1200, url = 'https://64.media.tumblr.com/art.jpg'): Tumblr.Photo => ({
  caption: 'Artwork',
  original_size: { url, width, height: width / 2 },
  alt_sizes: [],
})
const posts = (...photos: Tumblr.Photo[]) => [{ photos }] as Tumblr.Post[]

describe('optimized post images', () => {
  it('generates responsive URLs without changing the full-resolution modal source', async () => {
    const source = photo()
    const transform = vi.fn(async (_source, width) => `/_astro/art-${width}.webp`)
    const result = await optimizePostImages(posts(source), transform)
    expect(transform.mock.calls.map(([, width]) => width)).toEqual([320, 640, 960, 1200])
    expect(result[0].photos[0].optimized).toEqual({
      src: '/_astro/art-640.webp',
      srcSet:
        '/_astro/art-320.webp 320w, /_astro/art-640.webp 640w, /_astro/art-960.webp 960w, /_astro/art-1200.webp 1200w',
    })
    expect(result[0].photos[0].original_size).toEqual(source.original_size)
    expect(source.optimized).toBeUndefined()
  })

  it('does not upscale small images or generate duplicate sizes', async () => {
    const transform = vi.fn(async (_source, width) => `/art-${width}.webp`)
    const result = await optimizePostImages(
      posts(photo(250), photo(640, 'https://64.media.tumblr.com/b.png')),
      transform
    )
    expect(transform.mock.calls.map(([, width]) => width)).toEqual([250, 320, 640])
    expect(result[0].photos[0].optimized?.srcSet).toBe('/art-250.webp 250w')
  })

  it('reuses transformations for an image shared by posts', async () => {
    const transform = vi.fn(async () => '/art.webp')
    await optimizePostImages([...posts(photo()), ...posts(photo())], transform)
    expect(transform).toHaveBeenCalledTimes(4)
  })

  it('preserves animated images, fixtures and sources outside the allowed host', async () => {
    const sources = [
      photo(1200, 'https://64.media.tumblr.com/animation.gif'),
      photo(1200, '/fixture-artwork.svg'),
      photo(1200, 'https://64.media.tumblr.com.example.org/art.jpg'),
    ]
    const transform = vi.fn(async () => '/art.webp')
    const result = await optimizePostImages(posts(...sources), transform)
    expect(result[0].photos).toEqual(sources)
    expect(transform).not.toHaveBeenCalled()
  })

  it('propagates conversion errors instead of publishing broken generated URLs', async () => {
    await expect(
      optimizePostImages(posts(photo()), async () => {
        throw new Error('image conversion failed')
      })
    ).rejects.toThrow('image conversion failed')
  })
})
