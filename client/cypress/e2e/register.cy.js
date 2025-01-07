describe("Registration Component Tests", () => {
  const baseUrl = "http://localhost:3000/login"; // Replace with your frontend's URL
  const validData = {
    firstName: "John",
    lastName: "Doe",
    address: "123 Test Street",
    city: "TestCity",
    streetAndNumber: "456 Main St",
    postalCode: "12345",
    country: "TestCountry",
    email: "testuser@example.com",
    phone: "1234567890",
    password: "Password123",
  };

  beforeEach(() => {
    cy.visit(baseUrl); // Navigate to the application
  });

  it("Should render the registration form by default", () => {
    // Ensure the Sign-Up form is displayed
    cy.get("form").should("exist");
    cy.contains("Sign Up").should("be.visible");
    cy.get("input[name='FirstName']").should("be.visible");
    cy.get("input[name='email']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
    cy.get("input[type='checkbox']").should("be.visible");
  });

  it("Should register successfully with valid details and checkbox checked", () => {
    // Fill in the registration form
    cy.get("input[name='FirstName']").type(validData.firstName);
    cy.get("input[name='LastName']").type(validData.lastName);
    cy.get("input[name='address']").type(validData.address);
    cy.get("input[name='City']").type(validData.city);
    cy.get("input[name='streetAndNumber']").type(validData.streetAndNumber);
    cy.get("input[name='PostalCode']").type(validData.postalCode);
    cy.get("input[name='Country']").type(validData.country);
    cy.get("input[name='email']").type(validData.email);
    cy.get("input[name='phone']").type(validData.phone);
    cy.get("input[name='password']").type(validData.password);

    // Check the checkbox
    cy.get("input[type='checkbox']").check();

    // Submit the form
    cy.get("button[type='submit']").click();
  });

  it("Should switch to Login form and back to Registration", () => {
    // Switch back to Registration form
    cy.contains("Already have an account?");
    cy.contains("Login here").should("be.visible").click();
    // Switch to Login form
    cy.contains("Create a new account?");
    cy.contains("Click here").should("be.visible").click();
  });
});
