// 日英併記表示のテスト
describe('国際化対応（日英併記表示）', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('トップページで日本語と英語が両方表示される', () => {
    // 日本語のタイトル
    cy.contains('mieze illustration')
    // 英語でもアクセス可能（リダイレクトなし）
    cy.url().should('not.include', '/en')
    cy.url().should('not.include', '/ja')
  })

  it('Aboutページで日英併記のプロフィールが表示される', () => {
    cy.get('[data-testid="nav-link-/about"]').first().click()
    cy.url().should('eq', Cypress.config().baseUrl + '/about')

    // 日本語の著者名
    cy.get('[data-testid="author"]').should('contain', 'mieze')
    // 英語の説明文も同時に表示される
    cy.contains('Osaka') // 英語の場所表記
    cy.contains('大阪') // 日本語の場所表記（どちらかは表示される）
  })

  it('言語切り替えボタンは存在しない（併記なので不要）', () => {
    // 言語切り替え関連の要素がないことを確認
    cy.get('body').should('not.contain', '日本語')
    cy.get('body').should('not.contain', 'English')
    cy.get('[data-testid="language-switcher"]').should('not.exist')
  })
})

//404
describe('ルーティングが存在しないページにアクセスしたとき', () => {
  it('404ページが表示される', () => {
    cy.visit('/undefined_page_url', { failOnStatusCode: false })
    // 404ページのコンテンツ確認
    cy.url().should('include', 'undefined_page_url')
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
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.url().should('not.include', '/en')
    cy.url().should('not.include', '/ja')
  })
})
