import React from 'react';

const AlertBox = ({ message, type = 'info' }) => {
  const colors = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className={`${colors[type]} text-white p-4 rounded mb-4`}>
      {message}
    </div>
  );
};

export default AlertBox;
