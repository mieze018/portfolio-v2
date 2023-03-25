describe('トップページにアクセスしたとき', () => {
  it('タイトルが表示される', () => {
    cy.visit('/')
    cy.contains('mieze illustration')
  })
  describe('ブラウザの言語が英語の時', () => {
    it('/en/[path] にリダイレクトされる', () => {
      cy.visit('/', { headers: { 'Accept-Language': 'en' } })
      cy.url().should('match', /\/en$/)
    })
    it('/about を表示すると "Ayu Nakata"と表示される', () => {
      cy.visit('/en/about', { headers: { 'Accept-Language': 'en' } })
      //urlが'/en/about'になるのを待つ
      cy.url().should('eq', Cypress.config().baseUrl + '/en/about')
      //data-testid="about-name"の要素を取得
      cy.get('[data-testid="author"]').contains('Ayu Nakata')
    })
  })
})

})
