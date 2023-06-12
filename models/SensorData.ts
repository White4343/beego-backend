import mongoose from 'mongoose';
import {ISensor} from "../config/interface";

const SensorDataSchema = new mongoose.Schema({
  deviceID: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
    required: true,
  },
  humidity: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  temperatureRegime: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<ISensor>('SensorData', SensorDataSchema);