import mongoose from "mongoose";
import { GasStation } from "./models";

export const GasStationModel = mongoose.model(
  "GasStation",
  new mongoose.Schema<GasStation>({
    name: { type: String, required: true },
    city: { type: String, required: true },
    latestPrice: { type: Number, required: true },
  })
);

export const GasPriceModel = mongoose.model(
  "GasPrice",
  new mongoose.Schema({
    gasStation: { type: mongoose.Schema.Types.ObjectId, ref: "GasStation" },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  })
);
