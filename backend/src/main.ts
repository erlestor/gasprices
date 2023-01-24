import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { readFileSync } from "fs"
import mongoose, { SortOrder } from "mongoose"
import { GasPriceModel, GasStationModel } from "./dbService"
import { GasPrice, GasStation } from "./models"

const resolvers = {
  Query: {
    gasStations: async (
      _: unknown,
      args: {
        maxPrice: number
        city: string
        limit: number
        skip: number
        sortBy: string
        sortDirection: SortOrder
        nameSearch: string
      }
    ) => {
      const { maxPrice, city, limit, sortBy, sortDirection, nameSearch, skip } =
        args
      const priceQuery = {
        ...(maxPrice && { $lte: maxPrice }),
      }
      const query = {
        ...(city && { city }),
        ...(Object.keys(priceQuery).length && { latestPrice: priceQuery }),
        ...(nameSearch && { name: { $regex: nameSearch, $options: "i" } }),
      }
      return GasStationModel.find(query)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(limit)
    },
    gasStation: async (_: unknown, args: { id: string }) => {
      return GasStationModel.findById(args.id)
    },
  },
  GasStation: {
    prices: async (parent: { id: string }) => {
      return GasPriceModel.find({ gasStation: parent.id }).sort({
        createdAt: "asc",
      })
    },
  },
  Mutation: {
    createGasStation: async (_: unknown, args: GasStation) => {
      const gasStation = new GasStationModel(args)
      return gasStation.save()
    },
    createGasPrice: async (_: unknown, args: GasPrice) => {
      const { gasStation } = args
      const gasPrice = new GasPriceModel({
        ...args,
        // get current milliseconds since epoch
        createdAt: new Date().getTime(),
      })
      await gasPrice.save()

      // update latest price on GasStation
      await GasStationModel.updateOne(
        {
          _id: gasStation,
        },
        {
          latestPrice: gasPrice.price,
        }
      ).exec()
      return gasPrice
    },
  },
}

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" })
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

async function startServer() {
  const connectionString = "------ fill in yourself ------"
  await mongoose.connect(connectionString)

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀 Server ready at: ${url}`)
}

startServer()
