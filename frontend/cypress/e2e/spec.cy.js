/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("DrivstoffNetsiden", () => {
  it("it should be able to filter by city", () => {
    // clear localstorage
    cy.visit("http://localhost:3000/");

    cy.get("#header");

    // get the cities of the gas stations currently displayed
    const cities = [];
    for (let i = 1; i <= 10; i++) {
      cy.get(
        ":nth-child(" +
          i +
          ") > .maincontent_cardInformation__RQA3X > .maincontent_cardAreaDiv__Ko6Dy > .maincontent_cardArea__Gd4Eu"
      ).then(el => {
        cities.push(el.text());
      });
    }
    cy.wait(1000);
    cy.get("#filterIcon").click();
    cy.get("#Oslo").click();
  });
});
