import { MockedProvider } from "@apollo/client/testing"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { GET_GAS_STATIONS } from "../graphql/queries.graphql"
import { limit } from "../state/endlessScrollState"
import { GasStation } from "../types"
import { BrowserRouter } from "react-router-dom"
import { act } from "react-dom/test-utils"
import MainContent from "../components/mainContent/MainContent"

const gasStationMocks: GasStation[] = []
for (let i = 0; i < 12; i++) {
  gasStationMocks.push({
    id: i.toString(),
    name: "name",
    city: "city",
    latestPrice: 1,
  })
}

gasStationMocks.push({
  id: "13",
  name: "shell",
  city: "trondheim",
  latestPrice: 1,
})

describe("Debounce search", () => {
  test("Search should work after a delay", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
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
          {
            request: {
              query: GET_GAS_STATIONS,
              variables: {
                limit,
                city: undefined,
                maxPrice: 30,
                nameSearch: "shell",
                sortBy: "latestPrice",
                sortDirection: "ASC",
              }
            },
            result: {
              data: {
                gasStations: gasStationMocks.slice(12, 13),
              }
            }
          }
        ]}
      >
        <BrowserRouter>
          <MainContent />
        </BrowserRouter>
      </MockedProvider>
    )

    await waitFor(() =>
      expect(screen.getAllByTestId("gasStationName")[0].innerHTML).toEqual(
        "name"
      )
    )

    fireEvent.change(screen.getByTestId("searchBar"), {
      target: { value: "shell" },
    })

    await waitFor(() =>
      expect(screen.getAllByTestId("gasStationName")[0].innerHTML).not.toEqual(
        "shell"
      )
    )

    // TODO: get actual
    await new Promise((r) => setTimeout(r, 100))

    // check that the content has been updated
    await waitFor(() => {
      expect(screen.getAllByTestId("gasStationName")[0].innerHTML).toEqual("shell")
    })
  })
})
