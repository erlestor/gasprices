import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import mongoose from "mongoose";
import { Resolvers } from "./generated/graphql";

const GasStationModel = mongoose.model(
  "GasStation",
  new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
  })
);

const GasPriceModel = mongoose.model(
  "GasPrice",
  new mongoose.Schema({
    gasStation: { type: mongoose.Schema.Types.ObjectId, ref: "GasStation" },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  })
);

const resolvers: Resolvers = {
  Query: {
    gasStations: async (_, args) => {
      return GasStationModel.find() as any;
    },
  },
  GasStation: {
    prices: async (parent, args) => {
      return GasPriceModel.find({ gasStation: parent.id }) as any;
    },
    // latestPrice: (parent, args) => {
    //   return GasPriceModel.findOne({ gasStation: parent.id }).sort({
    //     createdAt: -1,
    //   }) as any;
    // },
  },
  Mutation: {
    createGasStation: async (_, args) => {
      const gasStation = new GasStationModel(args);
      return gasStation.save() as any;
    },
    createGasPrice: async (_, args) => {
      const gasPrice = new GasPriceModel(args);
      return gasPrice.save() as any;
    },
  },
};

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const connectionString = "mongodb://admin:admin@it2810-41.idi.ntnu.no:27017/";
await mongoose.connect(connectionString);

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
