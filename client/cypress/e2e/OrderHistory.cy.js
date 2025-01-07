describe("Order History Component Tests", () => {
  const baseUrl = "http://localhost:3000/userpanel/myOrders"; // Replace with your frontend's URL
  const validToken = "valid_token"; // Replace with a valid token for testing
  const validOrders = [
    {
      _id: "order1",
      CollectionCode: "ABC123",
      Status: 1,
      File: { Quantity: 10, Color: true, Format: "A4" },
      CreationDate: "2023-10-01",
      DrukomantID: "drukomat1",
    },
    {
      _id: "order2",
      CollectionCode: "XYZ456",
      Status: 2,
      File: { Quantity: 5, Color: false, Format: "A3" },
      CreationDate: "2023-10-02",
      DrukomantID: "drukomat2",
    },
  ];

  const drukomatDetails = {
    drukomat1: { city: "City1", address: "Address1" },
    drukomat2: { city: "City2", address: "Address2" },
  };

  beforeEach(() => {
    // Set the token in local storage or context before each test
    localStorage.setItem("token", validToken);
    cy.visit(baseUrl);
  });

  it("Should render the order history component", () => {
    // Check if the title is displayed
    cy.contains("Order History").should("be.visible");
  });

  it("Should fetch and display user orders", () => {
    // Mock the API response for fetching user orders
    cy.intercept("GET", "http://localhost:4000/api/orders/getUserOrders", {
      statusCode: 200,
      body: validOrders,
    }).as("getUser Orders");

    // Mock the API response for fetching drukomat details
    cy.intercept(
      "GET",
      "http://localhost:4000/api/drukomat/drukomaty/drukomat1",
      {
        statusCode: 200,
        body: drukomatDetails.drukomat1,
      }
    ).as("getDrukomat1");

    cy.intercept(
      "GET",
      "http://localhost:4000/api/drukomat/drukomaty/drukomat2",
      {
        statusCode: 200,
        body: drukomatDetails.drukomat2,
      }
    ).as("getDrukomat2");

    // Wait for the orders API call to complete
    cy.wait("@getUser Orders");

    // Check if the orders are displayed
    cy.contains("Order Code: ABC123").should("be.visible");
    cy.contains("Status: In Progress").should("be.visible");
    cy.contains("Quantity: 10").should("be.visible");
    cy.contains("Color: Yes").should("be.visible");
    cy.contains("Format: A4").should("be.visible");
    cy.contains("Data: 2023-10-01").should("be.visible");
    cy.contains("Drukomat Address: City1 Address1").should("be.visible");

    cy.contains("Order Code: XYZ456").should("be.visible");
    cy.contains("Status: Completed").should("be.visible");
    cy.contains("Quantity: 5").should("be.visible");
    cy.contains("Color: No").should("be.visible");
    cy.contains("Format: A3").should("be.visible");
    cy.contains("Data: 2023-10-02").should("be.visible");
    cy.contains("Drukomat Address: City2 Address2").should("be.visible");
  });

  it("Should show error message when not logged in", () => {
    // Remove the token to simulate not being logged in
    localStorage.removeItem("token");
    cy.visit(baseUrl);

    // Check for error message
    cy.contains("Please log in to view your orders.").should("be.visible");
  });

  it("Should show error message on failed orders fetch", () => {
    // Mock the API response for fetching user orders with an error
    cy.intercept("GET", "http://localhost:4000/api/orders/getUserOrders", {
      statusCode: 400,
      body: {
        success: false,
        message: "Failed to fetch orders. Please try again later.",
      },
    }).as("getUser OrdersError");

    // Wait for the API call to complete
    cy.wait("@getUser OrdersError");

    // Check for error message
    cy.contains("Failed to fetch orders. Please try again later.").should(
      "be.visible"
    );
  });
});
