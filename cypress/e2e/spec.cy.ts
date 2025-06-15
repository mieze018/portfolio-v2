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
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.url().should('not.include', '/en')
    cy.url().should('not.include', '/ja')
  })
})
