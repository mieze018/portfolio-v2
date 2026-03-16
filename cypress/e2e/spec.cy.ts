// 日英併記表示のテスト
describe('国際化対応（日英併記表示）', () => {
  beforeEach(() => {
    cy.visit('/')
  })
})

//404
describe('ルーティングが存在しないページにアクセスしたとき', () => {
  it('トップページにリダイレクトされる', () => {
    cy.visit('/undefined_page_url', { failOnStatusCode: false })
    //urlが`undefined_page_url`を含まなくなるのを待つ
    cy.url().should('not.include', 'undefined_page_url')
    // urlがbaseUrlまたはbaseUrl+/になることを確認する
    cy.url().should('match', new RegExp(`^${Cypress.config().baseUrl}(/)?$`))
  })
})

// index
describe('トップページにアクセスしたとき', () => {
  it('タイトルが表示される', () => {
    cy.visit('/')
    cy.contains('mieze illustration')
  })

  it('ページURLに言語プレフィックスがない', () => {
    cy.visit('/')
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.url().should('not.include', '/en')
    cy.url().should('not.include', '/ja')
  })
})

// ページ遷移時のスクロール位置
// Why: Contact→About遷移時にスクロール位置がページ途中に残るバグ(#100)の回帰防止
// scrollIntoView(true)はContentsWrapperのoffsetTop位置にスクロールするため、
// window.scrollYがContentsWrapperのoffsetTop付近(±50px)であることを検証する
describe('ページ遷移時のスクロール位置', () => {
  /**
   * ContentsWrapperのoffsetTopを取得し、scrollYがその付近にあるかを検証する。
   * scrollIntoView(true)はContentsWrapperの上端にビューポート上端を合わせるため、
   * scrollY ≈ offsetTop になるのが正常。
   */
  const assertScrolledToContentsWrapper = () => {
    cy.window().then((win) => {
      const contentsWrapper = win.document.querySelector('section.relative')
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Chaiのexpression style assertion
      expect(contentsWrapper).to.not.be.null
      const offsetTop = (contentsWrapper as HTMLElement).offsetTop
      const tolerance = 50
      // scrollYがContentsWrapperのoffsetTop付近にあること
      expect(win.scrollY).to.be.greaterThan(offsetTop - tolerance)
      expect(win.scrollY).to.be.lessThan(offsetTop + tolerance)
    })
  }

  it('Contact→About遷移後にコンテンツ先頭付近にスクロールされる', () => {
    // Contactページに遷移
    cy.visit('/contact')
    cy.url().should('include', '/contact')

    // Aboutナビリンクをクリック（ヘッダー・フッター両方にNavLinksがあるため.first()）
    cy.get('[data-testid="nav-link-/about"]').first().click()
    cy.url().should('include', '/about')

    // AnimatePresenceのトランジション完了を待つ
    // (exit 0.2s + enter 0.2s + requestAnimationFrame)
    cy.wait(800)

    assertScrolledToContentsWrapper()
  })

  it('Works(トップ)→About遷移後にコンテンツ先頭付近にスクロールされる', () => {
    cy.visit('/')

    // トップでスクロールを下げておく（長いページの場合）
    cy.scrollTo(0, 500)

    // Aboutナビリンクをクリック
    cy.get('[data-testid="nav-link-/about"]').first().click()
    cy.url().should('include', '/about')

    cy.wait(800)

    assertScrolledToContentsWrapper()
  })
})
