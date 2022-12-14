describe("add appointment test", () => {

  beforeEach(() => {
    cy.login();
  });

  it("add appointment", () => {
    cy.visit("http://localhost:5173/appointments");

    // cy.get("[data-cy=user_input]").select("Lorenz De Bie");
    cy.get("[data-cy=date_input]").type("2023-02-03");
    cy.get("[data-cy=startTime_input]").type("15:00");
    cy.get("[data-cy=endTime_input]").type("17:30");
    cy.get("[data-cy=training_input]").select("Strength: Chest");
    cy.get("[data-cy=specialRequest_input]").type("this is a test");
    cy.get("[data-cy=submit_appointment]").click();

    // cy.get("[data-cy=appointment_date]").eq(9).should("contain","Fri, 3 Feb 2023");
    cy.get("[data-cy=appointment_training]").eq(0).should("contain", "Strength: Chest");
    cy.get("[data-cy=appointment_startTime]").eq(0).should("contain", "15:00");
    cy.get("[data-cy=appointment_duration]").eq(0).should("contain", "150 minutes");
    cy.get("[data-cy=appointment_intensity]").eq(0).should("contain", 0);
    cy.get("[data-cy=appointment_specialRequest]").eq(0).contains("this is a test");
    cy.get("[data-cy=appointment]").should("have.length", 1);
  });

  it("remove again", () => {
    cy.visit("http://localhost:5173/appointments");
    cy.get("[data-cy=appointment_delete_btn]").eq(0).click();
    cy.get("[data-cy=appointment]").should("have.length", 0);
  });

  // it("startTime is too early", () => {
  //   cy.visit("http://localhost:5173/appointments");
  //   cy.get("[data-cy=user_input]").select("Lorenz De Bie");
  //   cy.get("[data-cy=date_input]").type("2022-12-24");
  //   cy.get("[data-cy=startTime_input]").type("05:59");
  //   cy.get("[data-cy=endTime_input]").type("12:30");
  //   cy.get("[data-cy=training_input]").select("Shoulder press");
  //   cy.get("[data-cy=specialRequest_input]").type("this is a test");
  //   cy.get("[data-cy=submit_appointment]").click();

  //   cy.get("[data-cy=labelInputAppointment-error]").should("be.visible");
  //   cy.get("[data-cy=labelInputAppointment-error]").eq(0).contains("Start time must be after 8:00");
  //   cy.get("[data-cy=labelInputAppointment-error]")
  //     .eq(0)
  //     .should("contain", "Start time must be after 8:00");
  // });
});