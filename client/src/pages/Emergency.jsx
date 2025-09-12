import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Emergency = () => {
  const { user } = useContext(AuthContext);

  const handleSOS = () => {
    if (user) {
      alert(`SOS activated! Calling ${user.emergencyContact}`);
      // In a real app, this would trigger a call or alert
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <div className="text-center max-w-lg mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white bg-clip-text">
          Emergency
        </h2>
        <div className="mb-8">
          <button
            onClick={handleSOS}
            className="cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-12 px-20 rounded-full text-3xl shadow-2xl hover:shadow-red-500/25 transform hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 animate-pulse"
          >
            SOS
          </button>
        </div>
        <p className="text-lg md:text-xl mb-6 text-gray-300 leading-relaxed">
          Press the SOS button to alert your emergency contact. Your location
          will be shared if available.
        </p>
        {user && (
          <div className="bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700 animate-fade-in">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <p className="text-lg font-medium text-gray-200">
                Emergency Contact:{" "}
                <span className="text-red-400">{user.emergencyContact}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Emergency;
