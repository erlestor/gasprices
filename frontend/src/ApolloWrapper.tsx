import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { hasMoreVar, limit } from "./state/endlessScrollState"
import { ReactNode } from "react"

//Error handling from the Apollo docs: Advanced Error Handling
//https://www.apollographql.com/docs/react/data/error-handling/
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: `https://api.gasprices.cumcounter.tk` }),
])

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
                hasMoreVar(false)
              }
              // Slicing is necessary because the existing data is
              // immutable, and frozen in development.
              const merged = existing ? existing.slice(0) : []
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i]
              }
              return merged
            },
          },
        },
      },
    },
  }),
  link: link,
})

function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloWrapper
