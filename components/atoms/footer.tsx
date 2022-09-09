import { memo } from 'react'
import tw from 'twin.macro'

export const Footer = memo(() => {
  //現在の年を取得
  const now = new Date()
  const this_year = now.getFullYear()
  const Footer = tw.footer`absolute bottom-0 py-0 text-xs text-center`
  return (
    <Footer>
      © 2009-{this_year} {process.env.REACT_APP_author}
    </Footer>
  )
})
Footer.displayName = 'Footer'
