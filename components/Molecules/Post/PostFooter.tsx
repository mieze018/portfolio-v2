import type { Tumblr } from 'libs/@type/api/tumblr'

const Wrapper = tw.footer`mt-0 text-xs sm:text-sm text-left w-full`

export const PostFooter = ({ postDate }: { postDate: Tumblr.Post['date'] }) => (
  <Wrapper>
    {new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(new Date(postDate.replace(' GMT', '').replace(' ', 'T')))}
  </Wrapper>
)
