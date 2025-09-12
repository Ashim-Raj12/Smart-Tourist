import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors duration-300">
          Smart Tourist
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition-colors duration-300">Home</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:text-blue-400 transition-colors duration-300">Profile</Link>
              <Link to="/map" className="hover:text-blue-400 transition-colors duration-300">Map</Link>
              <Link to="/emergency" className="hover:text-blue-400 transition-colors duration-300">Emergency</Link>
              <button onClick={handleLogout} className="hover:text-blue-400 transition-colors duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition-colors duration-300">Login</Link>
              <Link to="/register" className="hover:text-blue-400 transition-colors duration-300">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="block py-2 hover:text-blue-400 transition-colors duration-300" onClick={toggleMenu}>Home</Link>
            {user ? (
              <>
                <Link to="/profile" className="block py-2 hover:text-blue-400 transition-colors duration-300" onClick={toggleMenu}>Profile</Link>
                <Link to="/map" className="block py-2 hover:text-blue-400 transition-colors duration-300" onClick={toggleMenu}>Map</Link>
                <Link to="/emergency" className="block py-2 hover:text-blue-400 transition-colors duration-300" onClick={toggleMenu}>Emergency</Link>
                <button onClick={() => { handleLogout(); toggleMenu(); }} className="block py-2 hover:text-blue-400 transition-colors duration-300 text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 hover:text-blue-400 transition-colors duration-300" onClick={toggleMenu}>Login</Link>
                <Link to="/register" className="block py-2 hover:text-blue-400 transition-colors duration-300" onClick={toggleMenu}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
