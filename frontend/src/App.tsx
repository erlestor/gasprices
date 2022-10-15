import React from 'react';
import './App.css';
import Frontpage from './Components/Frontpage';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink, from } from '@apollo/client';
import {onError} from '@apollo/client/link/error';


//Error handling from the Apollo docs: Advanced Error Handling
//https://www.apollographql.com/docs/react/data/error-handling/
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    };
  });
  
  

  const link = from ([
    errorLink,
    new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  ]);
    
  //The apollo client
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });

function App() {

  return (
    <ApolloProvider client={client}>
        <Frontpage />
    </ApolloProvider>

  );
}

export default App;
