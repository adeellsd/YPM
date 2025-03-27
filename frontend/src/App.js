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
import ClientsForm from './pages/forms/ClientsForm';
import ArticlesForm from './pages/forms/ArticlesForm';
import CommandesForm from './pages/forms/CommandesForm';
import DevisForm from './pages/forms/DevisForm';
import FacturesForm from './pages/forms/FacturesForm';
import FournisseursForm from './pages/forms/FournisseursForm';
import LivraisonsForm from './pages/forms/LivraisonsForm';
import ContactsForm from './pages/forms/ContactsForm';
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

            {/* Routes clients */}
            <Route path="/clients/new" element={<ClientsForm />} />
            <Route path="/clients/:id/edit" element={<ClientsForm />} />
            <Route path="/clients/:id/view" element={<ClientsForm />} />
            
            {/* Routes commandes */}
            <Route path="/commandes/new" element={<CommandesForm />} />
            <Route path="/commandes/:id/edit" element={<CommandesForm />} />
            <Route path="/commandes/:id/view" element={<CommandesForm />} />
            
            {/* Routes articles */}
            <Route path="/articles/new" element={<ArticlesForm />} />
            <Route path="/articles/:id/edit" element={<ArticlesForm />} />
            <Route path="/articles/:id/view" element={<ArticlesForm />} />
            
            {/* Routes devis */}
            <Route path="/devis/new" element={<DevisForm />} />
            <Route path="/devis/:id/edit" element={<DevisForm />} />
            <Route path="/devis/:id/view" element={<DevisForm />} />
            
            {/* Routes factures */}
            <Route path="/factures/new" element={<FacturesForm />} />
            <Route path="/factures/:id/edit" element={<FacturesForm />} />
            <Route path="/factures/:id/view" element={<FacturesForm />} />
            
            {/* Routes fournisseurs */}
            <Route path="/fournisseurs/new" element={<FournisseursForm />} />
            <Route path="/fournisseurs/:id/edit" element={<FournisseursForm />} />
            <Route path="/fournisseurs/:id/view" element={<FournisseursForm />} />
            
            {/* Routes livraisons */}
            <Route path="/livraisons/new" element={<LivraisonsForm />} />
            <Route path="/livraisons/:id/edit" element={<LivraisonsForm />} />
            <Route path="/livraisons/:id/view" element={<LivraisonsForm />} />
            
            {/* Routes contacts */}
            <Route path="/contacts/new" element={<ContactsForm />} />
            <Route path="/contacts/:id/edit" element={<ContactsForm />} />
            <Route path="/contacts/:id/view" element={<ContactsForm />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;