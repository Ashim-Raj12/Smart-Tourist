import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Smart Tourist</Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:text-blue-400">Profile</Link>
              <Link to="/map" className="hover:text-blue-400">Map</Link>
              <Link to="/emergency" className="hover:text-blue-400">Emergency</Link>
              <button onClick={handleLogout} className="hover:text-blue-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400">Login</Link>
              <Link to="/register" className="hover:text-blue-400">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
