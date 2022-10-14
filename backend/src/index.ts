import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { GasPrice, GasStation, Resolvers } from "./generated/graphql";

const testPosts: GasStation[] = [
  {
    id: "1",
    name: "Nardo Esso",
    city: "Trondheim",
  },
  {
    id: "2",
    name: "Nardo Shell",
    city: "Trondheim",
  },
  {
    id: "3",
    name: "Nardo Circle K",
    city: "Trondheim",
  },
];

const testPrices: {[key: string]: GasPrice[]} = {
  "1": [
    {
      id: "1",
      price: 12.5,
      createdAt: new Date().getTime(),
    },
    {
      id: "2",
      price: 10.1,
      createdAt: new Date().getTime(),
    },
  ],
};

const resolvers: Resolvers = {
  Query: {
    gasStations: (_, args) => {
      return testPosts;
    },
  },
  GasStation: {
    prices: (parent, args) => {
      return testPrices[parent.id];
    },
    latestPrice: (parent, args) => {
      return testPrices[parent.id][0];
    }
  },
};

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
