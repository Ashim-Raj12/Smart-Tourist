import React, { useEffect, useState, useContext, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Map = () => {
  const [zones, setZones] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [mapKey, setMapKey] = useState(0);
  const [geoError, setGeoError] = useState(null);
  const { user } = useContext(AuthContext);
  const mapRef = useRef(null);
  const watchId = useRef(null);

  // Fetch zones
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const res = await api.get('/zones');
        if (res.data && Array.isArray(res.data)) {
          setZones(res.data);
        } else {
          console.error('Zones data is not an array:', res.data);
          setZones([]);
        }
      } catch (err) {
        console.error('Failed to fetch zones', err);
        setZones([]);
      }
    };

    fetchZones();
  }, []);

  // Watch user location
  useEffect(() => {
    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setGeoError(null);
          checkLocation(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error', error);
          setGeoError(error.message || 'Error getting location');
        },
        { enableHighAccuracy: true }
      );
    } else {
      setGeoError('Geolocation is not supported by your browser');
    }

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  // Check if user is in a risky zone
  const checkLocation = async (lat, lng) => {
    try {
      const res = await api.post('/zones/check', { lat, lng });
      if (res.data.inRiskyZone) {
        setAlertMessage('Warning: You are in a risky zone!');
        await api.post('/alerts/log', { zoneId: res.data.zoneId, message: 'Entered risky zone' });
      } else {
        setAlertMessage('');
      }
    } catch (err) {
      console.error('Failed to check location', err);
    }
  };

  // Retry map (remount)
  const retryMap = () => {
    setGeoError(null);
    setMapKey((prev) => prev + 1);
  };

  // Auto-center map when userLocation updates
  useEffect(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.setView(userLocation, 13);
    }
  }, [userLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Safety Map</h2>

        {geoError && (
          <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-400 p-4 rounded-lg mb-6 text-center animate-fade-in">
            Location Error: {geoError}
          </div>
        )}

        {alertMessage && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg mb-6 text-center animate-shake">
            {alertMessage}
          </div>
        )}

        <div className="h-96 md:h-[500px] lg:h-[600px] w-full bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
          {userLocation ? (
            <MapContainer
              key={mapKey}
              center={userLocation}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              whenCreated={(mapInstance) => {
                mapRef.current = mapInstance;
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {zones.map((zone) => (
                <Circle
                  key={zone._id}
                  center={[zone.lat, zone.lng]}
                  radius={zone.radius}
                  pathOptions={{ color: zone.type === 'safe' ? 'green' : 'red' }}
                >
                  <Popup>{zone.name} - {zone.type} zone</Popup>
                </Circle>
              ))}
              <Circle
                center={userLocation}
                radius={10}
                pathOptions={{ color: 'blue' }}
              >
                <Popup>Your Location</Popup>
              </Circle>
            </MapContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
              Getting your location...
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={retryMap}
            className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Retry Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
