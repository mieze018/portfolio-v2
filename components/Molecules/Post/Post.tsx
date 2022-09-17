import { motion } from 'framer-motion'
import tw, { styled } from 'twin.macro'

import type { Tumblr } from 'libs/@type/api/tumblr'

import { Photos } from 'components/Molecules/Post/Photos'
import { PostFooter } from 'components/Molecules/Post/PostFooter'

const Article = styled(motion.article)`
  ${tw`top-0 flex flex-col items-center justify-center w-full min-h-screen transition-all  mx-auto flex-wrap  px-[2.618vw] lg:mb-24  lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl`}
`

const PostCaption = tw.div`mt-0 text-sm sm:text-base text-left w-full`

const PhotoWrapper = styled.div<{ isColumn: boolean; isRow: boolean }>`
  ${tw`m-auto`}

  ${({ isRow, isColumn }) =>
    (isRow || isColumn) && tw`inline-flex flex-wrap items-center content-start justify-around`}
  ${({ isColumn }) => isColumn && tw`flex flex-wrap justify-center max-w-full`}
  ${({ isRow }) => isRow && tw`grid gap-y-4`}
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
