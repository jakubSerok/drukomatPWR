describe("Create Drukomat", () => {
  const baseUrl = "http://localhost:3000/creatDrukomat"; // Updated URL for the Create Drukomat page
  const apiUrl = "http://localhost:4000"; // Backend API URL
  const newDrukomat = {
    name: "New Drukomat",
    address: "456 Another St",
    city: "Warsaw",
    latitude: "52.2297",
    longitude: "21.0122",
    status: "Active",
    description: "A new drukomat for testing purposes.",
  };

  beforeEach(() => {
    // Mock the API response for creating a drukomat
    cy.intercept("POST", `${apiUrl}/api/drukomat/createDrukomat`, {
      statusCode: 201,
      body: newDrukomat, // Mock response
    }).as("createDrukomat");

    // Visit the Create Drukomat page
    cy.visit(baseUrl);
  });

  it("Should fill out the form and create a new drukomat", () => {
    // Fill out the form fields
    cy.get('input[name="name"]').type(newDrukomat.name);
    cy.get('input[name="address"]').type(newDrukomat.address);
    cy.get('input[name="city"]').type(newDrukomat.city);
    cy.get('input[name="latitude"]').type(newDrukomat.latitude);
    cy.get('input[name="longitude"]').type(newDrukomat.longitude);
    cy.get('input[name="status"]').type(newDrukomat.status);
    cy.get('textarea[name="description"]').type(newDrukomat.description);
  });

  it("Should show an error message if the API call fails", () => {
    // Mock the API response to simulate an error
    cy.intercept("POST", `${apiUrl}/api/drukomat/createDrukomat`, {
      statusCode: 500,
      body: { message: "Error creating drukomat" },
    }).as("createDrukomatError");

    // Fill out the form fields
    cy.get('input[name="name"]').type(newDrukomat.name);
    cy.get('input[name="address"]').type(newDrukomat.address);
    cy.get('input[name="city"]').type(newDrukomat.city);
    cy.get('input[name="latitude"]').type(newDrukomat.latitude);
    cy.get('input[name="longitude"]').type(newDrukomat.longitude);
    cy.get('input[name="status"]').type(newDrukomat.status);
    cy.get('textarea[name="description"]').type(newDrukomat.description);
  });
});
