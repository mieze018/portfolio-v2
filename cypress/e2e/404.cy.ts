describe('ルーティングが存在しないページにアクセスする', () => {
  it('トップページにリダイレクトされる', () => {
    cy.visit('/undefined_page_url', { failOnStatusCode: false })
    //urlが`undefined_page_url`を含まなくなるのを待つ
    cy.url().should('not.include', 'undefined_page_url')
    // urlがbaseUrlになることを確認する
    cy.url().should('eq', Cypress.config().baseUrl)
  })
})
