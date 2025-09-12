import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  blockchainId: { type: String, unique: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
