import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from 'fs';

const testPosts = [
  {
    id: 1,
    title: "Used car",
    description: "I am selling my used car",
    price: 1000,
  },
  {
    id: 2,
    title: "Used bike",
    description: "I am selling my used bike",
    price: 500,
  },
  {
    id: 3,
    title: "Used scooter",
    description: "I am selling my used scooter",
    price: 200,
  },
];

const resolvers = {
  Query: {
    getAllPosts: (_, args) => {
      let { maxPrice } = args;
      maxPrice = maxPrice || 1000000;
      return testPosts.filter((post) => post.price <= maxPrice);
    },
  },
};

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
