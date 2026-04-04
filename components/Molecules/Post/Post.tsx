import { Photos } from 'components/Molecules/Post/Photos'
import { PostFooter } from 'components/Molecules/Post/PostFooter'

import type { Tumblr } from 'libs/@type/api/tumblr'
import { cva, tw } from 'libs/component-factory'

// articleは直接cvaで定義
const articleVariants = cva(
  'flex flex-col items-center justify-center flex-wrap max-w-full lg:max-w-(--breakpoint-md) 2xl:max-w-(--breakpoint-lg) mx-auto px-[2.618vw] pb-64 min-h-g-61vh post-reveal-anim'
)

const PostCaption = tw('div', cva('mt-8 text-sm sm:text-base text-left w-full'))

const photoWrapperVariants = cva('mx-auto', {
  variants: {
    layout: {
      default: '',
      row: 'grid gap-y-4',
      column: 'flex flex-wrap justify-center max-w-full',
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
  return (
    <article className={articleVariants()}>
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

      <PostCaption
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Tumblr API から返却される HTML を表示するため意図的に使用。外部入力ではなく API レスポンスに限定
        dangerouslySetInnerHTML={{
          __html: post.caption,
        }}
      />
      <PostFooter postDate={post.date} />
    </article>
  )
}
