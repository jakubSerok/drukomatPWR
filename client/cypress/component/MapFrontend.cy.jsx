import React from "react";
import { mount } from "cypress/react"; // React component mounting
import "cypress-real-events/support"; // For simulating user interactions
import Map from "../../src/components/Map/Map";

describe("Map Component", () => {
  beforeEach(() => {
    // Mount the Map component
    mount(<Map />);
  });

  it("renders the map component correctly", () => {
    // Check if input and search button are visible
    cy.get("input[placeholder='Wpisz miasto...']").should("be.visible");
    cy.contains("Szukaj").should("be.visible");

    // Check if map container is rendered
    cy.get(".leaflet-container").should("exist");
  });
});
