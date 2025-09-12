import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Profile</h2>
        <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-200">{user.name}</h3>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                <p className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 text-gray-200">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <p className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 text-gray-200">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Emergency Contact</label>
                <p className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 text-gray-200">{user.emergencyContact}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Blockchain ID</label>
                <p className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 text-xs break-all text-gray-200 font-mono">{user.blockchainId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
