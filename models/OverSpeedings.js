import { Schema, model } from 'mongoose';

const speedSchema = new Schema({
  plate_no: String,
  location: String,
  time: { type: String, default: () => new Date().toLocaleTimeString() },
  date: { type: Date, required:true }
});

export default model('OverSpeedings', speedSchema);
