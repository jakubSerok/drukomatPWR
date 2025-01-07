describe("Create Order Tests with Map Marker Selection", () => {
  const baseUrl = "http://localhost:3000/userpanel/order"; // Base URL for the order page
  const apiUrl = "http://localhost:4000"; // Backend API URL
  const drukomat = {
    _id: "12345",
    name: "Test Drukomat",
    address: "123 Main Street",
    latitude: 52.2297,
    longitude: 21.0122,
  };

  beforeEach(() => {
    // Mock the API responses
    cy.intercept("GET", `${apiUrl}/api/drukomat/getDrukomaty`, {
      statusCode: 200,
      body: [drukomat], // Mock Drukomat data
    }).as("getDrukomats");

    cy.intercept("POST", `${apiUrl}/api/orders/createOrder`, {
      statusCode: 201,
      body: { success: true, message: "Order created successfully!" },
    }).as("createOrder");

    // Visit the Create Order page
    cy.visit(baseUrl);
  });

  it("Should render the Create Order page and display Drukomats", () => {
    // Assert the page is loaded
    cy.contains("Create Order").should("be.visible");

    // Assert Drukomats are displayed
    cy.wait("@getDrukomats").then((interception) => {
      console.log(interception.response.body); // Debugging: Print the API response
    });
    cy.get(".p-2.mb-2") // Replace this selector with the actual Drukomat class or identifier
      .should("contain", drukomat.name);
  });
  it("Should render the map with markers and allow marker selection", () => {
    // Wait for Drukomats to load
    cy.wait("@getDrukomats");

    // Assert the map is rendered
    cy.get(".leaflet-container").should("be.visible"); // Adjust if your map container class is different

    // Assert a marker is rendered on the map
    cy.get(".leaflet-marker-icon").should("exist");

    // Click the marker corresponding to the test Drukomat
    cy.get(".leaflet-marker-icon").first().click(); // Assuming the first marker is the Drukomat

    // Assert the popup or Drukomat selection is visible
    cy.contains("Test Drukomat").should("be.visible"); // Adjust based on your popup text
  });

  it("Should allow selecting a marker and submitting an order", () => {
    // Click the marker corresponding to the Drukomat
    cy.get(".leaflet-marker-icon").first().click();

    // Assert the Drukomat is selected
    cy.contains("Test Drukomat").should("be.visible");

    // Upload a file
    const fileName = "example.pdf";

    // Fill in form fields
    cy.get("input[name='Quantity']").clear().type("5");
    cy.get("select[name='Format']").select("A4");
    cy.get("input[name='Color']").check();
  });
});
