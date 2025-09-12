import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Smart Tourist Safety System</h1>
      <p className="max-w-md text-center mb-6">
        Welcome to the Smart Tourist Safety System. Stay safe while exploring new places with AI-powered geo-fencing and emergency alerts.
      </p>
      <p className="max-w-md text-center">
        Use the app to view safe and risky zones on the map, get alerts, and access emergency contacts quickly.
      </p>
    </div>
  );
};

export default Home;
