describe('トップページにアクセスする', () => {
  it('タイトルが表示される', () => {
    cy.visit('/')
    cy.contains('mieze illustration')
  })
})
