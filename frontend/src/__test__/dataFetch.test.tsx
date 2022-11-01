import { MockedProvider } from "@apollo/client/testing"
import MainContent from "../Components/mainContent/MainContent"
import { render, screen, waitFor } from "@testing-library/react"
import { GET_GAS_STATIONS } from "../graphql/queries.graphql"
import { limit } from "../state/endlessScrollState"
import { GasStation } from "../types"
import { BrowserRouter } from "react-router-dom"

const gasStationMocks: GasStation[] = []
for (let i = 0; i < limit; i++) {
  gasStationMocks.push({
    id: i.toString(),
    name: "name",
    city: "city",
    latestPrice: 1,
  })
}

describe("Data fetching", () => {
  test("Should render n items on load, where n is the size of limit", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_GAS_STATIONS,
              variables: {
                limit,
                city: undefined,
                maxPrice: 30,
                nameSearch: "",
                sortBy: "latestPrice",
                sortDirection: "ASC",
              },
            },
            result: {
              data: {
                gasStations: gasStationMocks,
              },
            },
          },
        ]}
      >
        {/* Must use App-component, not MainContente else Link component throw error */}
        <BrowserRouter>
          <MainContent />
        </BrowserRouter>
      </MockedProvider>
    )

    // expect to have n items
    await waitFor(() =>
      expect(screen.getAllByTestId("gasStationEl")).toHaveLength(limit)
    )
  })
})
