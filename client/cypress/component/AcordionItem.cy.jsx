// Import React and necessary libraries
import React from "react";
import "../../src/index.css"; // Import the global CSS
import { mount } from "cypress/react"; // Mount the React component
import "cypress-real-events/support"; // For simulating real user interactions
import AccordionItem from "../../src/components/FAQ/AcordionItem"; // Update the path if necessary

describe("AccordionItem Component", () => {
  const headerText = "Test Header";
  const bodyText = "This is the test content of the accordion.";

  beforeEach(() => {
    mount(<AccordionItem header={headerText} text={bodyText} />);
  });

  it("renders the component with the correct header and hidden content", () => {
    // Sprawdzenie czy nagłowek jest vidoczny
    cy.contains(headerText).should("be.visible");

    // Sprawdzenie czy nagłowek nie jest wiczny
    cy.contains(bodyText).should("not.be.visible");
  });

  it("toggles the arrow icon rotation correctly", () => {
    // Sprawdzenie czy strzałka nie jest obrócona
    cy.get("svg").should("not.have.class", "rotate-180");

    // Click to expand
    cy.contains(headerText).realClick();

    // Verify arrow is rotated
    cy.get("svg").should("have.class", "rotate-180");

    // Click to collapse
    cy.contains(headerText).realClick();

    // Verify arrow is no longer rotated
    cy.get("svg").should("not.have.class", "rotate-180");
  });

  it("handles keyboard interaction (Enter and Space)", () => {
    // Sprawdzenie czy nagłowek (przycisk jest wiczony)
    cy.get("button").focus();

    // Press "Enter" to toggle
    cy.realPress("Enter");
    cy.contains(bodyText).should("be.visible");

    // Press "Space" to toggle
    cy.realPress("Space");
    cy.contains(bodyText).should("not.be.visible");
  });
});
