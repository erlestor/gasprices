import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const Posts = [
  {
    id: 1,
    title: "Used car",
    description: "I am selling my used car",
  }, 
  {
    id: 2,
    title: "Used bike",
    description: "I am selling my used bike",
  },
  {
    id: 3,
    title: "Used scooter",
    description: "I am selling my used scooter",
  }
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Post" type defines the queryable fields for every Post in our data source.
  type Post {
    id: ID!
    title: String!
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "Posts" query returns an array of zero or more Posts (defined above).
  type Query {
    getAllPost: [Post]
  }
`;

const resolvers = {
  Query: {
    getAllPost: () => Posts,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
