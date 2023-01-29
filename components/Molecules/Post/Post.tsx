import { motion } from 'framer-motion'
import { styled } from 'stailwc'

import type { Tumblr } from 'libs/@type/api/tumblr'

import { Photos } from 'components/Molecules/Post/Photos'
import { PostFooter } from 'components/Molecules/Post/PostFooter'

const Article = styled(motion.article)`
  ${tw`flex flex-col items-center justify-center flex-wrap
    max-w-full lg:max-w-screen-md 2xl:max-w-screen-lg
    mx-auto px-[2.618vw] pb-64
    min-h-g-61vh
   `}
`

const PostCaption = tw.div`mt-8 text-sm sm:text-base text-left w-full`

const PhotoWrapper = styled.div<{ isColumn: boolean; isRow: boolean }>`
  ${({ isRow, isColumn }) => [
    tw`mx-auto`,
    (isRow || isColumn) && tw`inline-flex flex-wrap items-center content-start justify-around`,
    isColumn && tw`flex flex-wrap justify-center max-w-full`,
    isRow && tw`grid gap-y-4`,
  ]}
`

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
    <Article
      as={motion.article}
      variants={variants}
      initial="inactive"
      whileInView="whileInView"
      transition={{ duration: 0.25, delay: 0, ease: 'easeInOut' }}
    >
      <PhotoWrapper isColumn={isColumn} isRow={isRow}>
        <Photos
          photos={post.photos}
          isShowOnlyLastPhoto={isShowOnlyLastPhoto}
          isColumn={isColumn}
        />
      </PhotoWrapper>

      <PostCaption
        dangerouslySetInnerHTML={{
          __html: post.caption,
        }}
      />
      <PostFooter postDate={post.date} />
    </Article>
  )
}
