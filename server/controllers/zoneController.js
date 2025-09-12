import Zone from '../models/Zone.js';

// Haversine formula to calculate distance between two points on Earth
const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

export const getZones = async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const checkLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude required' });
    }

    const zones = await Zone.find({ type: 'risky' });
    let inRiskyZone = false;
    let riskyZone = null;

    for (const zone of zones) {
      const distance = getDistance(lat, lng, zone.lat, zone.lng);
      if (distance * 1000 < zone.radius) { // radius in meters
        inRiskyZone = true;
        riskyZone = zone;
        break;
      }
    }

    res.json({ inRiskyZone, zone: riskyZone });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
