import type { Tumblr } from 'libs/@type/api/tumblr'
import { cva, tw } from 'libs/component-factory'

const Wrapper = tw(
  'footer',
  cva('mt-0 text-xs sm:text-sm text-left w-full flex items-center gap-4')
)

type postFooterPropsType = {
  postDate: Tumblr.Post['date']
  idString?: string
}

export const PostFooter = ({ postDate, idString }: postFooterPropsType) => (
  <Wrapper>
    <span>
      {new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
      }).format(new Date(postDate.replace(' GMT', '').replace(' ', 'T')))}
    </span>
    {idString && (
      <a
        href={`/posts/${idString}`}
        className="underline hover:opacity-70"
        aria-label="この投稿のパーマネントリンク"
      >
        ¶
      </a>
    )}
  </Wrapper>
)
