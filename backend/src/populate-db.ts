import mongoose from "mongoose";
import { GasPriceModel, GasStationModel } from "./dbService";

async function populateDb() {
  const connectionString = "mongodb://admin:admin@it2810-41.idi.ntnu.no:27017/";
  await mongoose.connect(connectionString);

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const cities = [
    "Oslo",
    "Bergen",
    "Trondheim",
    "Stavanger",
    "Kristiansand",
    "Tromsø",
    "Bodø",
  ];

  const names = ["Shell", "Circle K", "Esso", "Uno-X"];

  // generate 500 gas stations
  for (let i = 0; i < 500; i++) {
    console.log("Creating gas station", i);
    const gasStation = new GasStationModel({
      name: `${pick(names)}`,
      city: pick(cities),
      latestPrice: 17 + Math.random() * 10,
    });
    const doc = await gasStation.save();
    const prices = [];
    for (let j = 0; j < 2 + 5 * Math.random(); j++) {
      const gasPrice = new GasPriceModel({
        gasStation: doc._id,
        createdAt: new Date().getTime() - 1000 * 60 * 60 * 24 * j,
        price: 17 + Math.random() * 10,
      });
      await gasPrice.save();
      prices.push(
        gasPrice
      );
    }
    // update latest price
    gasStation.updateOne({ latestPrice: prices[0].price });
  }
}
populateDb();
