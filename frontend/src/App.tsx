import React from "react"
import "./App.css"
import Frontpage from "./Components/frontpage/Frontpage"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddItemPage from "./Components/addItem/AddItemPage"

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
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
])

//The apollo client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/addItem" element={<AddItemPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
