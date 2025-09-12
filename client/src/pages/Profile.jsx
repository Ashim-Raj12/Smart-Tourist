import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <p className="bg-gray-700 p-2 rounded">{user.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <p className="bg-gray-700 p-2 rounded">{user.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Emergency Contact</label>
            <p className="bg-gray-700 p-2 rounded">{user.emergencyContact}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Blockchain ID</label>
            <p className="bg-gray-700 p-2 rounded text-xs break-all">{user.blockchainId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
