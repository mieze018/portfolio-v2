// i18n
describe('ブラウザの言語が英語の時', () => {
  //この中で実行するテストの前に毎回行う処理
  beforeEach(() => {
    //ブラウザの言語を英語に設定してトップページにアクセス
    cy.visit('/', { headers: { 'Accept-Language': 'en' } })
  })
  it('/en/[path] にリダイレクトされる', () => {
    cy.url().should('match', /\/en$/)
  })
  it('aboutへのリンクをクリックすると、"Osaka, Japan"と表示される', () => {
    cy.get('[data-testid="nav-link-/about"]').first().click()
    //urlが'/en/about'になるのを待つ
    cy.url().should('eq', Cypress.config().baseUrl + '/en/about')
    cy.contains('Osaka, Japan')
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
})
