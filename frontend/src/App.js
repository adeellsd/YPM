import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Commandes from './pages/Commandes';
import Livraisons from './pages/Livraisons';
import Factures from './pages/Factures';
import Devis from './pages/Devis';
import Fournisseurs from './pages/Fournisseurs';
import Articles from './pages/Articles';
import XDock from './pages/XDock';
import Contacts from './pages/Contacts';
import './App.css';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-clash">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/commandes" element={<Commandes />} />
            <Route path="/livraisons" element={<Livraisons />} />
            <Route path="/factures" element={<Factures />} />
            <Route path="/devis" element={<Devis />} />
            <Route path="/fournisseurs" element={<Fournisseurs />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/xdock" element={<XDock />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;