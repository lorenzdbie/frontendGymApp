describe("exercises test", () => {
  it("show exercise", () => {
    cy.intercept("GET", "http://localhost:9000/api/trainings", {
      fixture: "exercises.json"
    });

    cy.visit("http://localhost:5173/exercises");
    cy.get("[data-cy=exercise]").should("have.length", 1);
    cy.get("[data-cy=exercise_name]").eq(0).contains("Training 1");
    cy.get("[data-cy=exercise_muscleGroup]").eq(0).should("contain", "training muscle groups");

  });
  it("very slow response", () => {
    cy.intercept(
      "http://localhost:9000/api/trainings",
      (req) => {
        req.on("response", (res) => {
          res.setDelay(1000);
        });
      }

    ).as("slowResponse");
    cy.visit("http://localhost:5173/exercises");
    cy.get("[data-cy=loading]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loading]").should("not.exist");
  });

  it("check filter", () => {
    cy.visit("http://localhost:5173/exercises");
    cy.get("[data-cy=exercises_search_input]").type("press");
    cy.get("[data-cy=exercise]").should("have.length", 2);
    cy.get("[data-cy=exercise_name]").each((el, idx) => {
      expect(el[0].textContent).to.match(/press/);
    });
  });

  it("check empty filter", () => {
    cy.visit("http://localhost:5173/exercises");
    cy.get("[data-cy=exercises_search_input]").type("xyz");
    cy.get("[data-cy=exercise]").should("have.length", 0);
    cy.get("[data-cy=exercises_error").should("not.exist");
  });

  it("error from backend", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/trainings", {
        statusCode: 500,
        body: {
          error: "internal server error"
        }
      }
    );
    cy.visit("http://localhost:5173/exercises");
    cy.get("[data-cy=exercises_search_input]").type("press");
    cy.get("[data-cy=exercise]").should("have.length", 0);
    cy.get("[data-cy=exercises_error]").should("be.visible");
  });
});