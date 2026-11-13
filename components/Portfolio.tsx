import { ContentsWrapper } from 'components/Atoms/ContentsWrapper'
import Layout from 'components/Layout/Default'
import { Post } from 'components/Molecules/Post/Post'
import { AboutContent } from 'components/Organisms/AboutContent'
import { ContactContent } from 'components/Organisms/ContactContent'
import { Posts } from 'components/Organisms/Posts'
import { PrivacyPolicy } from 'components/Organisms/PrivacyPolicy'
import { Provider } from 'jotai'
import type { portfolioContentType } from 'libs/contentTypes'
import { tags } from 'libs/tags'

import { PathContext } from 'libs/usePathname'

type portfolioPropsType = {
  pathname: string
  content: portfolioContentType
  postId?: string
  formId?: string
}

// Why: 開く側とモーダルを同じ island に置き、Jotai の共有状態を維持する。
export const Portfolio = ({ pathname, content, postId, formId = '' }: portfolioPropsType) => {
  let page: React.ReactNode
  if (postId) {
    const post = content.posts.find((item) => item.id_string === postId)
    page = post ? <Post post={post} /> : null
  } else if (pathname === '/about') {
    page = <AboutContent socialLinks={content.socialLinks} fallbackData={content.about} />
  } else if (pathname === '/contact') {
    page = <ContactContent fallbackData={content.contact} formId={formId} />
  } else if (pathname === '/privacy_policy') {
    page = <PrivacyPolicy />
  } else {
    page = (
      <Posts
        posts={content.posts}
        tag={pathname === '/client_works' ? tags.commissionedWork : tags.personalWork}
      />
    )
  }

  return (
    <Provider>
      <PathContext.Provider value={pathname}>
        <Layout socialLinks={content.socialLinks}>
          <ContentsWrapper $key={pathname}>{page}</ContentsWrapper>
        </Layout>
      </PathContext.Provider>
    </Provider>
  )
}
