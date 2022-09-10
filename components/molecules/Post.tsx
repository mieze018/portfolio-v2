import { PostFooter } from 'components/Molecules/PostFooter'
import { Photo, Post } from 'libs/@type/tumblr'
import Image from 'next/image'
import tw, { styled } from 'twin.macro'

const Article = tw.article`flex max-w-full flex-col flex-wrap justify-center px-[2.618vw] mb-[1.618vh]`
const Caption = tw.div`mt-0 text-sm sm:text-base`
const FadeWrapper = tw.div`flex flex-col items-center justify-center min-h-screen top-0 w-full transition-all`

const PhotoWrapper = styled.div<{ photoset?: boolean }>`
  ${tw`m-auto`}
  ${({ photoset }) => photoset && tw`flex flex-wrap justify-center max-w-full`}
`

export const PostComponent = ({ post }: { post: Post }) => (
  <FadeWrapper key={post.id}>
    <Article>
      <PhotoWrapper photoset={!!post.photoset_layout}>
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

const PhotoImage = ({
  photo,
  showOnlyLastPhoto,
  lastPhoto,
}: {
  photo: Photo
  showOnlyLastPhoto: boolean
  lastPhoto: boolean
}) => {
  //最後の画像だけ表示するタグがついている場合、最後の画像でなければスキップ
  if (showOnlyLastPhoto && lastPhoto) return <></>
  return (
    <Image
      className="w-full"
      src={photo.original_size.url}
      alt={photo.original_size.url}
      key={photo.original_size.url}
      height={photo.original_size.height}
      width={photo.original_size.width}
    />
  )
}
