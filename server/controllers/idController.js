import User from '../models/User.js';
import crypto from 'crypto';

export const verifyId = async (req, res) => {
  try {
    const { blockchainId } = req.body;
    if (!blockchainId) {
      return res.status(400).json({ message: 'blockchainId is required' });
    }

    const user = await User.findOne({ blockchainId });
    if (!user) {
      return res.status(404).json({ message: 'User not found or ID invalid' });
    }

    // Simulate immutability check by hashing user data and comparing with blockchainId
    const dataString = user.email + user.name + user.emergencyContact;
    const hash = crypto.createHash('sha256').update(dataString).digest('hex');

    if (hash === blockchainId) {
      return res.json({ valid: true, user: { id: user._id, name: user.name, email: user.email } });
    } else {
      return res.json({ valid: false, message: 'ID verification failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
