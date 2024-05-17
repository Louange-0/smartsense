import { Schema, model } from 'mongoose';

const accidentSchema = new Schema({
  plate_no: String,
  location: String,
  time: { type: String, default: () => new Date().toLocaleTimeString() },
  date: { type: Date, required:true}
});

export default model('Accidents', accidentSchema);
