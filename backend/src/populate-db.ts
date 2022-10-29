import mongoose from "mongoose";
import { GasStationModel } from "./dbService";

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
    await gasStation.save();
  }
}
populateDb();
