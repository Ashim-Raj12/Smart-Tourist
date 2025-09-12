import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 mt-auto shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm md:text-base">&copy; 2023 Smart Tourist Safety System. Stay safe!</p>
        <div className="mt-2 flex justify-center space-x-4 text-xs md:text-sm">
          <a href="#" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 transition-colors duration-300">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
