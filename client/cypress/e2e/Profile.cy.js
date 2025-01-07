describe("Profile Component Tests", () => {
  const baseUrl = "http://localhost:3000/userpanel/profile"; // Replace with your frontend's URL

  const validToken = "valid_token"; // Replace with a valid token for testing

  const validUserData = {
    _id: "12345",

    FirstName: "John",

    LastName: "Doe",

    email: "testuser@example.com",

    phone: "1234567890",

    address: "123 Test Street",

    streetAndNumber: "456 Main St",

    City: "TestCity",

    PostalCode: "12345",

    Country: "TestCountry",
  };

  beforeEach(() => {
    // Set the token in local storage or context before each test

    cy.visit(baseUrl);

    localStorage.setItem("token", validToken); // Simulate user being logged in
  });

  it("Should render the profile form with user data", () => {
    // Mock the API response for fetching user profile

    cy.intercept("GET", "http://localhost:4000/api/user/user", {
      statusCode: 200,

      body: { success: true, ...validUserData },
    }).as("getUser Profile");

    // Wait for the API call to complete

    cy.wait("@getUser Profile");

    // Check if the form fields are populated with user data

    cy.get("input[name='FirstName']").should(
      "have.value",
      validUserData.FirstName
    );

    cy.get("input[name='LastName']").should(
      "have.value",
      validUserData.LastName
    );

    cy.get("input[name='email']").should("have.value", validUserData.email);

    cy.get("input[name='phone']").should("have.value", validUserData.phone);

    cy.get("input[name='address']").should("have.value", validUserData.address);

    cy.get("input[name='streetAndNumber']").should(
      "have.value",
      validUserData.streetAndNumber
    );

    cy.get("input[name='City']").should("have.value", validUserData.City);

    cy.get("input[name='PostalCode']").should(
      "have.value",
      validUserData.PostalCode
    );

    cy.get("input[name='Country']").should("have.value", validUserData.Country);
  });

  it("Should update the profile successfully with valid details", () => {
    // Mock the API response for updating user profile

    cy.intercept("POST", "http://localhost:4000/api/user/edit", {
      statusCode: 200,

      body: { success: true },
    }).as("updateUser Profile");

    // Fill in the form with new data

    cy.get("input[name='FirstName']").clear().type("Jane");

    cy.get("input[name='LastName']").clear().type("Smith");

    cy.get("input[name='email']").clear().type("janesmith@example.com");

    cy.get("input[name='phone']").clear().type("0987654321");

    cy.get("input[name='address']").clear().type("789 New Address");

    cy.get("input[name='streetAndNumber']").clear().type("101 New St");

    cy.get("input[name='City']").clear().type("NewCity");

    // Submit the form

    cy.get("button[type='submit']").click();

    // Wait for the update API call to complete

    cy.wait("@updateUser Profile");

    // Check for success message

    cy.contains("Profile updated successfully!").should("be.visible");
  });

  it("Should show error message when not logged in", () => {
    // Remove the token to simulate not being logged in

    localStorage.removeItem("token");

    cy.visit(baseUrl);

    // Check for error message

    cy.contains("Please log in to view your profile.").should("be.visible");
  });

  it("Should show error message on failed profile fetch", () => {
    // Mock the API response for fetching user profile with an error

    cy.intercept("GET", "http://localhost:4000/api/user/user", {
      statusCode: 400,

      body: { success: false, message: "Failed to fetch profile data." },
    }).as("getUser ProfileError");

    // Wait for the API call to complete

    cy.wait("@getUser ProfileError");

    // Check for error message

    cy.contains("Failed to fetch profile data.").should("be.visible");
  });
});
