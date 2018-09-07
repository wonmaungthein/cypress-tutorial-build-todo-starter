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
    beforeEach(() => {
      cy.server();
    });
    it("Adds a new to do submit", () => {
      const itemText = "Buy eggs";
      cy.route("POST", "/api/todos", {
        name: itemText,
        id: 1,
        isComplete: false
      });

      cy.get(".new-todo")
        .type(itemText)
        .type("{enter}")
        .should("have.value", "");
      cy.get(".todo-list li")
        .should("have.length", 1)
        .and("contain", itemText);
    });

    it.only("shows an error message on a failed submission", () => {
      cy.route({
        url: "/api/todos",
        method: "POST",
        status: 500,
        response: {}
      });
      cy.get(".new-todo")
        .type("test{enter}")
        .should("not.exist");

      cy.get(".error").should("be.visible");
    });
  });
});
