import { useUserAgent } from 'next-useragent'
import { useRecoilState } from 'recoil'

import { userAgentState } from 'libs/recoil/atoms'

export const useMobileLink = () => {
  const [userAgent] = useRecoilState(userAgentState)

  const ua = useUserAgent(userAgent ?? '')
  ua?.isMobile && document.querySelector('html')?.classList.add('android')
  /**スマホでアクセスした時tumblrへのリンクをアプリから開くリンクに書き換え*/
  return `http://www.tumblr.com/open/app?app_args=blog&blogName=${process.env.NEXT_PUBLIC_Tumblr_username}&page=blog`
}
