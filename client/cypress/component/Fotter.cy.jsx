import React from "react";
import Footer from "../../src/components/Footer/Footer";
import "../../src/index.css"; // Import Tailwind styles
import "cypress-real-events/support"; // Support for real hover events

describe("Footer Component", () => {
  beforeEach(() => {
    cy.mount(<Footer />);
  });

  it("renders the footer with the correct background color", () => {
    cy.get("footer").should("have.css", "background-color", "rgb(1, 22, 39)"); // Test koloru tła
  });

  it("displays the correct number of social media icons", () => {
    cy.get("footer a svg").should("have.length", 6); // Sprawdzenie ilosći ikon
  });

  it("ensures all links have valid href attributes", () => {
    cy.get("footer a[href]").each(($link) => {
      const href = $link.prop("href");
      expect(href).to.be.a("string").and.not.be.empty; // Sprawdzenie czy linki są puste
    });
  });

  it("checks the hover effect on social media icons", () => {
    cy.get("footer a").first().realHover(); // Trigger hover
    cy.get("footer a").first().should("have.css", "color", "rgb(36, 148, 127)"); // Sprawdzenie najechania na przycisk
  });
});
