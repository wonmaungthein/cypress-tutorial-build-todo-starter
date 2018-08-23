describe("Input form", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("focuses input on load", () => {
    cy.focused().should("have.class", "new-todo");
  });
  it("accepts input", () => {
    const typedText = "Buy Milk";

    cy.get(".new-todo")
      .type(typedText)
      .should("have.value", typedText);
  });

  context("form submition", () => {
    it.only("Adds a new to do submit", () => {
      cy.get(".new-todo")
        .type("Buy eggs")
        .type("{enter}");
    });
  });
});
