import Image from 'next/image'
import tw from 'twin.macro'
import { Photo, Post } from 'pages/@type/tumblr'
import { PostFooter } from 'components/molecules/PostFooter'
const Article = tw.article`flex max-w-full mb-10`
const PhotoWrapper = tw.div`m-auto`
const Caption = tw.div`mt-0 text-sm sm:text-base`
export const PostComponent: React.FC<{ post: Post }> = ({ post }) => (
  <>
    <div key={post.id_string} className={`fade-wrapper`}>
      <Article>
        <div
          className={`${post.photoset_layout ? 'photoset block' : post.type}`}
        >
          <PhotoWrapper>
            {post.photos.map((photo: Photo, photoK: any) => {
              if (
                !post.tags.find((tag: string, i: any) => tag === 's-o-l-p') ||
                photoK === post.photos.length - 1
              ) {
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
              } else {
                return null
              }
            })}
          </PhotoWrapper>
          <Caption
            dangerouslySetInnerHTML={{
              __html: post['caption'],
            }}
          />
          <PostFooter postDate={post.date} />
        </div>
      </Article>
    </div>
  </>
)
