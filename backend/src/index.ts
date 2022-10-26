import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import mongoose from "mongoose";

const GasStationModel = mongoose.model(
  "GasStation",
  new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    latestPrice: { type: Number, required: true },
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

const resolvers = {
  Query: {
    gasStations: async (_, args) => {
      const { maxPrice, minPrice, city, limit, sortBy, nameSearch } = args;
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
        .sort({ [sortBy]: "asc" })
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

const connectionString = "mongodb://admin:admin@it2810-41.idi.ntnu.no:27017/";
await mongoose.connect(connectionString);

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
