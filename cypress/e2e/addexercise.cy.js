describe("add exercise test", () => {

  beforeEach(() => {
    cy.login();
  });
  
  it("add exercise", () => {
    cy.visit("http://localhost:5173/exercises");
    cy.get("[data-cy=exerciseName_input]").type("test");
    cy.get("[data-cy=muscleGroup_input]").type("this is a test");
    cy.get("[data-cy=submit_exercise]").click();

    // cy.get("[data-cy=exercise_name]").eq(11).should("contain", "test");
    // cy.get("[data-cy=exercise_muscleGroup]").eq(11).contains("this is a test");

    cy.get("[data-cy=exercise]").should("have.length", 12);

  });

  it("remove again", () => {
    cy.visit("http://localhost:5173/exercises");
    cy.get("[data-cy=exercise_delete_btn]").eq(11).click();
    cy.get("[data-cy=exercise]").should("have.length", 11);
  });

  it("name is too short", () => {
    cy.visit("http://localhost:5173/exercises");
    cy.get("[data-cy=exerciseName_input]").type("a");
    cy.get("[data-cy=muscleGroup_input]").type("this is a test");
    cy.get("[data-cy=submit_exercise]").click();

    cy.get("[data-cy=labelInput-error").should("be.visible");
    cy.get("[data-cy=labelInput-error").eq(0).contains("Name must be at least 2 characters long");
    cy.get("[data-cy=labelInput-error")
      .eq(0)
      .should("contain", "Name must be at least 2 characters long");
  });

  it("name is too long", () => {
    cy.visit("http://localhost:5173/exercises");
    cy.get("[data-cy=exerciseName_input]").type("Aaaaa Bbbbb Ccccc Ddddd Eeeee F");
    cy.get("[data-cy=muscleGroup_input]").type("this is a test");
    cy.get("[data-cy=submit_exercise]").click();

    cy.get("[data-cy=labelInput-error").should("be.visible");
    cy.get("[data-cy=labelInput-error").eq(0).contains("Name can only be 30 characters long");
    cy.get("[data-cy=labelInput-error")
      .eq(0)
      .should("contain", "Name can only be 30 characters long");
  });

  it("muscle group is too short", () => {
    cy.visit("http://localhost:5173/exercises");
    cy.get("[data-cy=exerciseName_input]").type("test");
    cy.get("[data-cy=muscleGroup_input]").type("a");
    cy.get("[data-cy=submit_exercise]").click();

    cy.get("[data-cy=labelTextArea-error").should("be.visible");
    cy.get("[data-cy=labelTextArea-error").eq(0).contains("Muscle group must be at least 3 characters long");
    cy.get("[data-cy=labelTextArea-error")
      .eq(0)
      .should("contain", "Muscle group must be at least 3 characters long");
  });

  it("muscle group is too long", () => {
    cy.visit("http://localhost:5173/exercises");
    cy.get("[data-cy=exerciseName_input]").type("test");
    cy.get("[data-cy=muscleGroup_input]").type("Aaaaa Bbbbb Ccccc Ddddd Eeeee Fffff Ggggg Hhhhh Iiiii Jjjjj Kkkkk Lllll Mmmmm Nnnnn Ooooo Ppppp Qqqqq");
    cy.get("[data-cy=submit_exercise]").click();

    cy.get("[data-cy=labelTextArea-error").should("be.visible");
    cy.get("[data-cy=labelTextArea-error").eq(0).contains("Muscle group can only be 100 characters long");
    cy.get("[data-cy=labelTextArea-error")
      .eq(0)
      .should("contain", "Muscle group can only be 100 characters long");
  });

});