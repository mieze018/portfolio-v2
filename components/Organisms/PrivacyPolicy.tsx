import tw from 'twin.macro'

const Wrapper = tw.div`px-5 max-w-screen-md m-auto grid gap-y-4 text-xs mb-20`
const P = tw.p``

export const PrivacyPolicy = () => {
  return (
    <Wrapper>
      <div>
        <h2>個人情報の利用目的</h2>
        <P>
          取得した個人情報は、必要な連絡のみに利用させていただくもので、これらの目的以外では利用いたしません。
        </P>
      </div>
      <div>
        <h2>個人情報の第三者開示</h2>
        <P>
          取得した個人情報は適切に管理し、正当な理由がある場合を除き第三者に提供することはありません。
        </P>
      </div>
      <div>
        <h2>お問合せフォーム</h2>
        <P>
          当サイトでは、お問い合わせフォームにFormspreeを利用しています。
          <P>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://formspree.io/legal/privacy-policy/"
            >
              Formspree Privacy Policy
            </a>
          </P>
        </P>
      </div>
      <div>
        <h2>著作権・肖像権</h2>
        <P>
          当サイトで掲載しているすべてのコンテンツの著作権・肖像権等は当サイト所有者または各権利所有者が保有し、許可なく無断利用することを禁止します。
        </P>
      </div>
      <div>
        <h2>アクセス解析</h2>
        <P>
          当サイトでは、サイトの分析と改善のためにGoogleが提供している「Google
          アナリティクス」を利用しています。
        </P>
        <P>
          <a
            href="https://support.google.com/analytics/answer/7318509?hl=ja"
            target="_blank"
            rel="noreferrer"
          >
            プライバシーの開示に関するポリシー（アナリティクス ヘルプ）
          </a>
        </P>
      </div>
      <div>
        <h2>プライバシーポリシーの変更</h2>
        <P>当サイトは、本プライバシーポリシーの内容を適宜見直し、その改善に努めます。</P>
        <P>本プライバシーポリシーは、事前の予告なく変更することがあります。</P>
        <P>本プライバシーポリシーの変更は、当サイトに掲載された時点で有効になるものとします。</P>
      </div>
    </Wrapper>
  )
}
