import { motion } from 'motion/react'
import { cva } from 'class-variance-authority'

import type { Tumblr } from 'libs/@type/api/tumblr'

import { Photos } from 'components/Molecules/Post/Photos'
import { PostFooter } from 'components/Molecules/Post/PostFooter'

const articleVariants = cva(
  'flex flex-col items-center justify-center flex-wrap max-w-full lg:max-w-screen-md 2xl:max-w-screen-lg mx-auto px-[2.618vw] pb-64 min-h-g-61vh'
)

const postCaptionVariants = cva('mt-8 text-sm sm:text-base text-left w-full')

const photoWrapperVariants = cva('mx-auto', {
  variants: {
    layout: {
      default: '',
      row: 'inline-flex flex-wrap items-center content-start justify-around grid gap-y-4',
      column:
        'inline-flex flex-wrap items-center content-start justify-around flex flex-wrap justify-center max-w-full',
    },
  },
  defaultVariants: {
    layout: 'default',
  },
})

export const Post = ({ post }: { post: Tumblr.Post }) => {
  // TODO:投稿ごとにタグでレイアウト指定できるようにするといいかも
  /** 画像が2枚以上(photoset)で4枚以上なら横に並べる*/
  const isColumn = !!post.photoset_layout && post.photos.length >= 4
  /** 画像が2枚以上(photoset)で4枚未満なら縦に並べる*/
  const isRow = !!post.photoset_layout && !isColumn
  const isShowOnlyLastPhoto = post.tags.includes('s-o-l-p')
  /** ビューに入るまでぼかす */
  const variants = {
    whileInView: {
      // opacity: 1,
      filter: 'blur(0px) brightness(1)',
    },
    inactive: {
      // opacity: 0.5,
      filter: 'blur(8px)  brightness(1.1)',
    },
  }
  return (
    <motion.article
      className={articleVariants()}
      variants={variants}
      initial="inactive"
      whileInView="whileInView"
      transition={{ duration: 0.25, delay: 0, ease: 'easeInOut' }}
    >
      <div
        className={photoWrapperVariants({
          layout: isColumn ? 'column' : isRow ? 'row' : 'default',
        })}
      >
        <Photos
          photos={post.photos}
          isShowOnlyLastPhoto={isShowOnlyLastPhoto}
          isColumn={isColumn}
        />
      </div>

      <div
        className={postCaptionVariants()}
        dangerouslySetInnerHTML={{
          __html: post.caption,
        }}
      />
      <PostFooter postDate={post.date} />
    </motion.article>
  )
}
