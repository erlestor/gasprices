import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Frontpage from "./Components/frontpage/Frontpage";
import { GasStationPage } from "./Components/gasStationPage/GasStationPage";
import { hasMoreVar, limit } from "./state/endlessScrollState";

// Error handling from the Apollo docs: Advanced Error Handling
// https://www.apollographql.com/docs/react/data/error-handling/
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

//The apollo client
const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          gasStations: {
            keyArgs: [
              "city",
              "maxPrice",
              "nameSearch",
              "sortBy",
              "sortDirection",
            ],
            merge(existing: [], incoming: [], { args: { skip = 0 } }: any) {
              // if number of items is less than limit, there are no more items to fetch
              if (incoming.length < limit) {
                hasMoreVar(false);
              }
              // Slicing is necessary because the existing data is
              // immutable, and frozen in development.
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/station/:id" element={<GasStationPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
