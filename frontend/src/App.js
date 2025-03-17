import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

// Pages
// import Dashboard from './pages/Dashboard';
// import Contacts from './pages/Contacts';
// import Clients from './pages/Clients';
// import Fournisseurs from './pages/Fournisseurs';
// import Articles from './pages/Articles';
// import Devis from './pages/Devis';
// import Commandes from './pages/Commandes';
// import Livraisons from './pages/Livraisons';
// import Factures from './pages/Factures';
// import XDock from './pages/XDock';

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/fournisseurs" element={<Fournisseurs />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/devis" element={<Devis />} />
            <Route path="/commandes" element={<Commandes />} />
            <Route path="/livraisons" element={<Livraisons />} />
            <Route path="/factures" element={<Factures />} />
            <Route path="/xdock" element={<XDock />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;