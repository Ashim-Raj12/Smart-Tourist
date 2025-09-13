import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    emergencyContact: user?.emergencyContact || '',
    profilePic: user?.profilePic || '',
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put('/auth/profile', formData);
      const data = res.data;
      setIsEditing(false);
      if (data && data.user) {
        updateUser(data.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Profile</h2>
        <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
                {formData.profilePic ? (
                  <img src={formData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-sm text-gray-300"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-200">{formData.name}</h3>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-200"
                  />
                ) : (
                  <p className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 text-gray-200">{formData.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <p className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 text-gray-200">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Emergency Contact</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-200"
                  />
                ) : (
                  <p className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 text-gray-200">{formData.emergencyContact}</p>
                )}
              </div>
              {!isEditing && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Blockchain ID</label>
                  <p className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 text-xs break-all text-gray-200 font-mono">{user.blockchainId}</p>
                </div>
              )}
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex justify-center space-x-4 mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-200"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    disabled={loading}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-200"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
