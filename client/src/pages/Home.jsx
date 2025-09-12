import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in">
          Smart Tourist Safety System
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed animate-fade-in-delay">
          Welcome to the Smart Tourist Safety System. Stay safe while exploring new places with AI-powered geo-fencing and emergency alerts.
        </p>
        <p className="text-base md:text-lg text-gray-400 leading-relaxed animate-fade-in-delay-2">
          Use the app to view safe and risky zones on the map, get alerts, and access emergency contacts quickly.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={handleGetStarted} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Get Started
          </button>
          <button className="cursor-pointer bg-transparent border-2 border-blue-400 hover:bg-blue-400 text-blue-400 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
