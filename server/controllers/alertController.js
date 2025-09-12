import Alert from '../models/Alert.js';

export const logAlert = async (req, res) => {
  try {
    const { zoneId, message } = req.body;
    const userId = req.user.id;

    if (!zoneId || !message) {
      return res.status(400).json({ message: 'zoneId and message are required' });
    }

    const alert = new Alert({
      userId,
      zoneId,
      message,
      timestamp: new Date(),
    });

    await alert.save();

    res.status(201).json({ message: 'Alert logged successfully', alert });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAlerts = async (req, res) => {
  try {
    const userId = req.user.id;
    const alerts = await Alert.find({ userId }).populate('zoneId').sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
