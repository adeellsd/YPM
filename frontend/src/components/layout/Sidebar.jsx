import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  TruckIcon, 
  CubeIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  ReceiptRefundIcon,
  ClipboardCheckIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const menuItems = [
    {
      title: 'Module Clients & Contacts',
      items: [
        { name: 'Contacts', path: '/contacts', icon: UserGroupIcon },
        { name: 'Clients', path: '/clients', icon: BuildingOfficeIcon },
      ]
    },
    {
      title: 'Module Fournisseurs & Articles',
      items: [
        { name: 'Fournisseurs', path: '/fournisseurs', icon: TruckIcon },
        { name: 'Articles', path: '/articles', icon: CubeIcon },
      ]
    },
    {
      title: 'Module Commercial',
      items: [
        { name: 'Devis', path: '/devis', icon: DocumentTextIcon },
        { name: 'Commandes', path: '/commandes', icon: ShoppingCartIcon },
        { name: 'Livraisons', path: '/livraisons', icon: ClipboardDocumentListIcon },
        { name: 'Factures', path: '/factures', icon: ReceiptRefundIcon },
      ]
    },
    {
      title: 'Module Opérationnel',
      items: [
        { name: 'Contrôle XDock', path: '/xdock', icon: ClipboardCheckIcon },
      ]
    }
  ];

  return (
    <div className="w-64 bg-ypm-navy text-white flex flex-col h-full">
      <div className="p-4 border-b border-ypm-blue flex justify-center">
        <img src="/logo.svg" alt="YPM Logo" className="h-12" />
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((section, i) => (
          <div key={i} className="mb-6">
            <h3 className="px-4 text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              {section.title}
            </h3>
            <ul>
              {section.items.map((item, j) => {
                const Icon = item.icon;
                return (
                  <li key={j}>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        `flex items-center px-4 py-2 text-sm ${isActive 
                          ? 'bg-ypm-blue text-white' 
                          : 'text-gray-300 hover:bg-ypm-blue/40 hover:text-white'}`
                      }
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-ypm-blue text-xs text-center text-gray-400">
        © 2025 Yachting Pyrénées Méditerranée
      </div>
    </div>
  );
};

export default Sidebar;