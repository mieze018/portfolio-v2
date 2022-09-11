import tw, { styled } from 'twin.macro'

import type { Tumblr } from 'libs/@type/api/tumblr'

import { Photo } from 'components/Molecules/Post/Photo'
import { PostFooter } from 'components/Molecules/Post/PostFooter'

const Article = tw.article`flex max-w-full flex-col flex-wrap justify-center px-[2.618vw] mb-[1.618vh]`
const Caption = tw.div`mt-0 text-sm sm:text-base`
const FadeWrapper = tw.div`flex flex-col items-center justify-center min-h-screen top-0 w-full transition-all`

const PhotoWrapper = styled.div<{ photoset?: boolean }>`
  ${tw`grid m-auto gap-y-4 min-w-golden23vw xl:max-w-golden38vw`}
  ${({ photoset }) => photoset && tw`flex flex-wrap justify-center max-w-full`}
`

export const Post = ({ post }: { post: Tumblr.Post }) => (
  <FadeWrapper key={post.id}>
    <Article>
      <PhotoWrapper photoset={!!post.photoset_layout} className="photo-container">
        {post.photos.map((photo, index) => (
          <PhotoImage
            key={photo.original_size.url}
            photo={photo}
            showOnlyLastPhoto={!!post.tags.find((tag) => tag === 's-o-l-p')}
            lastPhoto={index === post.photos.length - 1}
          />
        ))}
      </PhotoWrapper>
      <Caption
        dangerouslySetInnerHTML={{
          __html: post['caption'],
        }}
      />
      <PostFooter postDate={post.date} />
    </Article>
  </FadeWrapper>
)
