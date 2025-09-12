import React from 'react';

const AlertBox = ({ message, type = 'info' }) => {
  const colors = {
    info: 'bg-blue-500 border-blue-600',
    success: 'bg-green-500 border-green-600',
    warning: 'bg-yellow-500 border-yellow-600',
    error: 'bg-red-500 border-red-600',
  };

  return (
    <div className={`${colors[type]} text-white p-4 rounded-lg border-l-4 shadow-md mb-4 animate-fade-in`}>
      {message}
    </div>
  );
};

export default AlertBox;
