import { Schema, model } from 'mongoose';

const disconnectionSchema = new Schema({
  plate_no: String,
  location: String,
  time: { type: String, default: () => new Date().toLocaleTimeString() },
  date: { type: Date, default: Date.now }
});

export default model('Disconnections', disconnectionSchema);
