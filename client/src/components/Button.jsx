import React from 'react';

const Button = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
