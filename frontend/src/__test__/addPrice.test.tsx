import { InMemoryCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddItem from "../Components/addItem/AddItem";

import { CREATE_GAS_PRICE } from "../graphql/mutations.graphql";

const price = { gasStationId: "635cfcafe0c44e3883108e14", price: 15 };
const mocks = [
  {
    request: {
      query: CREATE_GAS_PRICE,
      variables: {
        gasStation: price.gasStationId,
        price: price.price,
      },
    },
    result: { data: price },
  }
];

it("should find the new price", async () => {
  render(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
      cache={new InMemoryCache()}
    >
      <AddItem id={price.gasStationId} refetch={() => {}} />
    </MockedProvider>
  );

  const priceInput = screen.getByTestId("price");
  userEvent.type(priceInput, "15");
  const submitButton = screen.getByTestId("submit");
  userEvent.click(submitButton);

  // expect to have success message text
  expect(await screen.findByText("Prisen er oppdatert til 15" )).toBeInTheDocument();
});
