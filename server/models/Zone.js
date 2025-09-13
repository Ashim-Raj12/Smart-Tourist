import mongoose from 'mongoose';

const zoneSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  radius: { type: Number, required: true },
  type: { type: String, enum: ['safe', 'moderate', 'danger'], required: true },
}, { timestamps: true });

const Zone = mongoose.model('Zone', zoneSchema);

export default Zone;
