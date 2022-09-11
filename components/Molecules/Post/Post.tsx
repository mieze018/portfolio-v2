import tw, { styled } from 'twin.macro'

import type { Tumblr } from 'libs/@type/api/tumblr'

import { Photos } from 'components/Molecules/Post/Photos'
import { PostFooter } from 'components/Molecules/Post/PostFooter'

const Article = tw.article`flex flex-col flex-wrap justify-center px-[2.618vw] lg:mb-24 w-full lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl`
const PostCaption = tw.div`mt-0 text-sm sm:text-base text-left w-full`
const FadeWrapper = tw.div`flex flex-col items-center justify-center min-h-screen top-0 w-full transition-all`

const PhotoWrapper = styled.div<{ isColumn: boolean; isRow: boolean }>`
  ${tw`m-auto`}
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
  return (
    <FadeWrapper key={post.id}>
      <Article>
        <PhotoWrapper isColumn={isColumn} isRow={isRow} className="photo-container">
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
    </FadeWrapper>
  )
}
