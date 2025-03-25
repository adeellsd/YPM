import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoHome, IoBoat, IoDocument, IoPersonCircle, IoStatsChart, IoCompass, IoSettings, IoReceipt, IoGrid } from 'react-icons/io5';
import Logo from '../../assets/logo-white.png'; // Assurez-vous que le chemin est correct

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  // Détermine si un lien est actif
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { path: '/dashboard', icon: <IoHome size={20} />, text: 'Dashboard' },
    { path: '/contacts', icon: <IoPersonCircle size={20} />, text: 'Contacts' },
    { path: '/clients', icon: <IoPersonCircle size={20} />, text: 'Clients' },
    { path: '/commandes', icon: <IoDocument size={20} />, text: 'Commandes' },
    { path: '/livraisons', icon: <IoCompass size={20} />, text: 'Livraisons' },
    { path: '/factures', icon: <IoReceipt size={20} />, text: 'Factures' },
    { path: '/devis', icon: <IoDocument size={20} />, text: 'Devis' },
    { path: '/fournisseurs', icon: <IoBoat size={20} />, text: 'Fournisseurs' },
    { path: '/articles', icon: <IoGrid size={20} />, text: 'Articles' },
    { path: '/xdock', icon: <IoStatsChart size={20} />, text: 'XDock' },
  ];

  return (
    <div className={`fixed top-0 left-0 h-full bg-[#292F6A] text-[#F6F3D0] w-64 transition-all duration-300 z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="p-4 flex items-center justify-between border-b border-opacity-20 border-[#E2E2E2]">
        <div className="flex items-center">
          <img src={Logo} alt="YPM Logo" className="h-8 mr-2" />
          <span className="font-clash font-bold tracking-wider">YPM</span>
        </div>
        <button 
          className="md:hidden text-[#F6F3D0] focus:outline-none" 
          onClick={toggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-1">
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#F6F3D0] text-[#292F6A] font-clash font-medium'
                    : 'text-[#F6F3D0] hover:bg-opacity-10 hover:bg-white font-clash font-light'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-opacity-20 border-[#E2E2E2]">
        <Link 
          to="/settings" 
          className="flex items-center text-[#F6F3D0] hover:bg-opacity-10 hover:bg-white px-4 py-2 rounded transition-colors font-clash font-light"
        >
          <IoSettings size={20} className="mr-3" />
          <span>Paramètres</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;