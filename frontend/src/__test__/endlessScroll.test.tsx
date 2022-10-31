import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import MainContent from "../Components/mainContent/MainContent";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

describe("Endless functionality", () => {
  test("should initially render n items, where n is the size of limit", () => {
    render(
        <MockedProvider>
          <MainContent/>
        </MockedProvider>
    );
    
    // expect to have n items
    expect(screen.getAllByTestId("gasStationEl")).toHaveLength(10);
  });
});
