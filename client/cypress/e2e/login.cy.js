describe("Login Component Tests with Checkbox", () => {
  const email = "test2@gmail.com";
  const password = "Qwerty123";
  const baseUrl = "http://localhost:3000/login"; // Replace with your frontend's URL

  beforeEach(() => {
    cy.visit(baseUrl); // Visit your application
  });

  it("Should render the login form", () => {
    // Check if the login form is displayed
    cy.contains("Login").click();
    cy.get("form").should("exist");
    cy.get("input[name='email']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
    cy.get("input[type='checkbox']").should("be.visible");
  });

  it("Should log in successfully with valid credentials and checkbox checked", () => {
    // Navigate to login
    cy.contains("Login").click();

    // Fill in the email and password
    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);

    // Click the checkbox
    cy.get("input[type='checkbox']").check();

    // Submit the form
    cy.get("button[type='submit']").click();
  });

  it("Should show an error if the checkbox is not checked", () => {
    // Navigate to login
    cy.contains("Login").click();

    // Fill in the email and password
    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);

    // Submit the form without checking the checkbox
    cy.get("button[type='submit']").click();
  });

  it("Should not log in without filling the form", () => {
    // Navigate to login
    cy.contains("Login").click();

    // Submit without filling
    cy.get("button[type='submit']").click();
  });
});
