import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  zoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;
