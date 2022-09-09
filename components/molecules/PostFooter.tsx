import tw from 'twin.macro'
import { Photo, Post } from 'pages/@type/tumblr'

const Wrapper = tw.footer`mt-0 text-xs sm:text-sm`

export const PostFooter = ({ postDate }: { postDate: Post['date'] }) => (
  <Wrapper>
    {new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(new Date(postDate.replace(' GMT', '').replace(' ', 'T')))}
  </Wrapper>
)
