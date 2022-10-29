import mongoose from "mongoose";
import { GasStationModel } from "./dbService";

async function deleteAllFromDb() {
  const connectionString = "mongodb://admin:admin@it2810-41.idi.ntnu.no:27017/";
  await mongoose.connect(connectionString);

  await GasStationModel.deleteMany({});
}
deleteAllFromDb();
