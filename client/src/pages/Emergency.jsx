import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Emergency = () => {
  const { user } = useContext(AuthContext);

  const handleSOS = () => {
    if (user && user.emergencyContact) {
      
      window.open(`tel:${user.emergencyContact}`);
    } else {
      alert('No emergency contact number set.');
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
            className="cursor-pointer bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-extrabold py-8 px-16 rounded-3xl text-4xl shadow-lg hover:shadow-red-600/50 transform hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-60 animate-pulse"
          >
            SOS
          </button>
        </div>
        <p className="text-lg md:text-xl mb-6 text-gray-300 leading-relaxed">
          Press the SOS button to call your emergency contact.
        </p>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-white">Emergency Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="tel:911"
              className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center"
            >
              Police: 911
            </a>
            <a
              href="tel:911"
              className="cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-center"
            >
              Fire: 911
            </a>
            <a
              href="tel:911"
              className="cursor-pointer bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-center"
            >
              Ambulance: 911
            </a>
            <a
              href="tel:112"
              className="cursor-pointer bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-center"
            >
              Tourist Police: 112
            </a>
          </div>
        </div>
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
