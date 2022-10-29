/* eslint-disable no-undef */
/// <reference types="cypress" />

// run with a test database with generated test data
describe("DrivstoffNetsiden filter, sort and searching", () => {
  it("it should be able to filter by city", () => {
    // clear localstorage
    cy.visit("http://localhost:3000/");

    cy.get("#header");

    // get the cities of the gas stations currently displayed
    cy.get("#filterIcon").click();
    cy.get("#Oslo").click();
    for (let city of ["Trondheim", "Bergen", "Stavanger", "Tromsø"]) {
      cy.get("main").contains(city).should("not.exist");
    }
    cy.get("main").contains("Oslo");
  });

  it("should be able to search by text search", () => {
    cy.get("#searchInput").type("Shell");
    for (let gasStation of ["Statoil", "Circle K", "Esso"]) {
      cy.get("main").contains(gasStation).should("not.exist");
    }
    cy.get("main").contains("Shell").should("exist");
  });

  it("should be able to change the ordering", () => {
    // the default filter is by price ascending
    // verify that the prices are sorted correctly
    const priceTextToNumber = (priceText) => {
      return Number(priceText.replace("kr", "").replace(",", "."));
    };
    const verifyOrdering = (direction = "asc", elements) => {
      let prices = [];
      elements.each((index, element) => {
        prices.push(priceTextToNumber(element.innerText));
      });
      let sortedPrices = prices.slice().sort((a, b) => {
        if (direction === "asc") return a - b;
        return b - a;
      });
      expect(prices).to.deep.equal(sortedPrices);
    };
    cy.get(".maincontent_cardPrice__3tJ-8").then((elements) => {
      verifyOrdering("asc", elements);

      // change filter from pricing increasing to decreasing
      cy.get("#filters").select("latestPrice|DESC");
      // wait for the elements to be updated
      cy.wait(100);
      cy.get(".maincontent_cardPrice__3tJ-8").then((elements) => {
        verifyOrdering("desc", elements);
      });
    });
  });
});

describe("add new gas price to gas station", () => {
  it("should able to add new gas price to gas station", () => {
    cy.visit("http://localhost:3000/");

    cy.get("#header");

    // press first gas station link
    cy.get("#gasStationLink").first().click();
    cy.get("#lastPriceText").then(el => {
      const lastPrice = parseFloat(el.text())
      cy.get('#price').type((lastPrice + 1).toString())
      cy.get('.additem_submit__7EaR7').click()
      cy.contains((lastPrice + 1).toString())
      cy.get('#lastPriceText').then(el => {
        expect(parseFloat(el.text())).to.equal(lastPrice + 1)
      })
    })
  });
});
