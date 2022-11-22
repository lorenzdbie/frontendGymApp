describe("Appointments Test", () => {
  it("show appointments", () => {
    cy.intercept("GET", "http://localhost:9000/api/appointments", {
      fixture: "appointments.json"
    });

    cy.visit("http://localhost:5173/appointments");
    cy.get("[data-cy=appointment]").should("have.length", 1);
    cy.get("[data-cy=appointment_user]").eq(0).contains("firstName lastName");
    cy.get("[data-cy=appointment_date]").eq(0).should("contain", "Fri, 2 Dec 2022");
    cy.get("[data-cy=appointment_training]").eq(0).contains("Shoulder press");
    cy.get("[data-cy=appointment_startTime]").eq(0).should("contain", "10:00");
    cy.get("[data-cy=appointment_duration]").eq(0).should("contain", "2:30 hours");
    // cy.get("[data-cy=appointment_intensity]").eq(0).should("contain", "3");
    cy.get("[data-cy=appointment_specialRequest]").eq(0).should("contain", "test");
  });

  it("very slow response", () => {
    cy.intercept(
      "http://localhost:9000/api/appointments",
      (req) => {
        req.on("response", (res) => {
          res.setDelay(1000);
        });
      }
    ).as("slowResponse");
    cy.visit("http://localhost:5173/appointments");
    cy.get("[data-cy=loading]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loading]").should("not.exist");
  });

  it("error from backend", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/appointments", {
        statusCode: 500,
        body: {
          error: "internal server error"
        }
      }
    );
    cy.visit("http://localhost:5173/appointments");
    cy.get("[data-cy=exercise]").should("have.length", 0);
    cy.get("[data-cy=exercises_error]").should("be.visible");
  });
});