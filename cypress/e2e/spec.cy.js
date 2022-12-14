describe('this is my first test', () => {
  it('does the App run?', () => {
    cy.visit('http://localhost:5173')
    cy.get("nav").should("exist")
    cy.get("picture").should("exist")
    // cy.get("form").should("exist")
    // cy.get('[data-cy=cancel]').click()
  })
})