import tw from 'twin.macro'

export const Footer = () => {
  //現在の年を取得
  const now = new Date()
  const this_year = now.getFullYear()
  const Wrapper = tw.footer`bottom-0 py-0 text-xs text-center`
  return (
    <Wrapper>
      © 2009-{this_year} {process.env.NEXT_PUBLIC_author}
    </Wrapper>
  )
}
