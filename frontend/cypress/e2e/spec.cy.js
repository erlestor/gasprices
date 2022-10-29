/* eslint-disable no-undef */
/// <reference types="cypress" />

// run with a test database with generated test data
describe("DrivstoffNetsiden", () => {
  it("it should be able to filter by city", () => {
    // clear localstorage
    cy.visit("http://localhost:3000/");

    cy.get("#header");

    // get the cities of the gas stations currently displayed
    cy.get("#filterIcon").click();
    cy.get("#Oslo").click();
    ["Trondheim", "Bergen", "Stavanger", "Tromsø"].forEach((city) => {
      cy.get("main").contains(city).should("not.exist");
    });
    cy.get("main").contains("Oslo")

    // filter by search
    cy.get("#searchInput").type("Shell");
    ["Shell", "Statoil", "Circle K", "Esso"].forEach(gasStation => {
      cy.get("main").contains(gasStation).should("not.exist");
    })
    cy.get("main").contains("Shell").should("exist");
  });
});
