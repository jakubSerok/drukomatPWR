describe("Drukomat API Tests", () => {
  const apiUrl = "http://localhost:4000/api/drukomat"; // Updated base URL
  let drukomatId; // Variable to store a created drukomat's ID

  // Test: Get all drukomaty
  it("Should fetch all drukomaty", () => {
    cy.request("GET", `${apiUrl}/getDrukomaty`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array"); // Expect an array of drukomaty
    });
  });

  // Test: Create a new drukomat
  it("Should create a new drukomat", () => {
    const newDrukomat = {
      name: "Test Drukomat",
      address: "123 Test Street",
      city: "TestCity",
      latitude: 51.107885,
      longitude: 17.038538,
      status: "active",
      description: "This is a test drukomat.",
    };

    cy.request("POST", `${apiUrl}/createDrukomat`, newDrukomat).then(
      (response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("_id");
        expect(response.body.name).to.eq(newDrukomat.name);

        // Save the created drukomat's ID for later use
        drukomatId = response.body._id;
      }
    );
  });

  // Test: Fetch drukomat by ID
  it("Should fetch a drukomat by ID", () => {
    cy.request("GET", `${apiUrl}/drukomaty/${drukomatId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("_id", drukomatId);
    });
  });

  // Test: Search drukomaty by city
  it("Should search drukomaty by city", () => {
    cy.request("GET", `${apiUrl}/searchDrukomat?city=TestCity`).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        expect(response.body[0].city).to.match(/TestCity/i); // Case-insensitive match
      }
    );
  });
});
