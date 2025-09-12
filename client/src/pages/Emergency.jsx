import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Emergency = () => {
  const { user } = useContext(AuthContext);

  const handleSOS = () => {
    if (user) {
      alert(`SOS activated! Calling ${user.emergencyContact}`);
      // In a real app, this would trigger a call or alert
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Emergency</h2>
      <button
        onClick={handleSOS}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-8 px-16 rounded-full text-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500"
      >
        SOS
      </button>
      <p className="mt-4 text-center max-w-md">
        Press the SOS button to alert your emergency contact. Your location will be shared if available.
      </p>
      {user && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <p className="text-sm">Emergency Contact: {user.emergencyContact}</p>
        </div>
      )}
    </div>
  );
};

export default Emergency;
