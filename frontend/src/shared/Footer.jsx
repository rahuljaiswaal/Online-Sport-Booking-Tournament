import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 mt-6 flex flex-wrap justify-center gap-4">
      <p className="text-lg">&copy; 2025</p>
      <a href="tel:9905749071" className="text-blue-400 hover:underline">9905749071</a>
      <a href="mailto:rahul770088@gmail.com" className="text-blue-400 hover:underline">rahul770088@gmail.com</a>
      <a href="https://www.linkedin.com/in/rahul-kumar-0b0764255/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>
    </footer>
  );
};

export default Footer;
