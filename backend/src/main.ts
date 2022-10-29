import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import mongoose from "mongoose";
import { GasStationModel, GasPriceModel } from "./dbService";

const resolvers = {
  Query: {
    gasStations: async (_, args) => {
      const { maxPrice, minPrice, city, limit, sortBy, sortDirection, nameSearch, skip } = args;
      const priceQuery = {
        ...(maxPrice && { $lte: maxPrice }),
        ...(minPrice && { $gte: minPrice }),
      };
      const query = {
        ...(city && { city }),
        ...(Object.keys(priceQuery).length && { latestPrice: priceQuery }),
        ...(nameSearch && { name: { $regex: nameSearch, $options: "i" } }),
      };
      return GasStationModel.find(query)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(limit) as any;
    },
  },
  GasStation: {
    prices: async (parent, args) => {
      return GasPriceModel.find({ gasStation: parent.id }) as any;
    },
  },
  Mutation: {
    createGasStation: async (_, args) => {
      const gasStation = new GasStationModel(args);
      return gasStation.save() as any;
    },
    createGasPrice: async (_, args) => {
      const { gasStation } = args;
      // TODO: make it a transaction
      const gasPrice = new GasPriceModel(args);
      await gasPrice.save();
      // update latest price on GasStation
      return GasStationModel.updateOne(
        {
          _id: gasStation,
        },
        {
          latestPrice: gasPrice.price,
        }
      );
    },
  },
};

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const connectionString = "mongodb://admin:admin@it2810-41.idi.ntnu.no:27017/";
  await mongoose.connect(connectionString);

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

startServer();