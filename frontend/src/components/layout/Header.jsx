import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2-white.png';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#292F6A] text-[#F6F3D0] py-4 z-20 relative">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="YPM Logo" className="h-12 mr-3" />
          <div>
          <h1 className="font-clash font-bold text-xl tracking-wider">Yachting Pyrénées Méditerranée</h1>
            <p className="font-clash font-extralight text-sm text-[#E2E2E2] tracking-wider">
              Food Service Delivery - Concierge Service - Exclusive Experience
            </p>
          </div>
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="font-clash font-medium hover:opacity-80 transition-opacity">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/services" className="font-clash font-medium hover:opacity-80 transition-opacity">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="font-clash font-medium hover:opacity-80 transition-opacity">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Menu mobile toggle */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden container mx-auto px-4 py-2">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link 
                to="/" 
                className="font-clash font-medium block py-1"
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className="font-clash font-medium block py-1"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="font-clash font-medium block py-1"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;