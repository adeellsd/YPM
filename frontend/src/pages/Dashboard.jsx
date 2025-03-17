import React from 'react';
import Card from '../components/common/Card';
import { 
  UserGroupIcon, 
  BuildingOfficeIcon,
  TruckIcon, 
  CubeIcon,
  DocumentTextIcon,
  ShoppingCartIcon 
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  // Données pour les widgets
  const stats = [
    { 
      id: 1, 
      title: 'Clients', 
      value: '124', 
      change: '+12%', 
      icon: BuildingOfficeIcon, 
      color: 'bg-blue-500' 
    },
    { 
      id: 2, 
      title: 'Contacts', 
      value: '543', 
      change: '+8%', 
      icon: UserGroupIcon, 
      color: 'bg-green-500' 
    },
    { 
      id: 3, 
      title: 'Fournisseurs', 
      value: '38', 
      change: '+5%', 
      icon: TruckIcon, 
      color: 'bg-purple-500' 
    },
    { 
      id: 4, 
      title: 'Articles', 
      value: '1,251', 
      change: '+22%', 
      icon: CubeIcon, 
      color: 'bg-amber-500' 
    },
    { 
      id: 5, 
      title: 'Commandes', 
      value: '245', 
      change: '+18%', 
      icon: ShoppingCartIcon, 
      color: 'bg-indigo-500' 
    },
    { 
      id: 6, 
      title: 'Devis', 
      value: '82', 
      change: '+15%', 
      icon: DocumentTextIcon, 
      color: 'bg-pink-500' 
    },
  ];

  // Activités récentes (données fictives)
  const recentActivities = [
    { id: 1, type: 'commande', ref: 'BC-1235', client: 'ABC Yachting', time: '2 heures' },
    { id: 2, type: 'devis', ref: 'D-4821', client: 'Méditerranée Boats', time: '4 heures' },
    { id: 3, type: 'livraison', ref: 'BL-0923', client: 'Yacht Services', time: '6 heures' },
    { id: 4, type: 'contact', ref: 'Jean Dupont', client: 'Navalia', time: '1 jour' },
    { id: 5, type: 'facture', ref: 'F-2241', client: 'Boat Supply', time: '1 jour' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-sm text-gray-500">Lundi 17 mars 2025</p>
      </div>
      
      {/* Bannière de bienvenue */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-ypm-navy to-ypm-blue h-48">
        <div className="relative p-8 flex flex-col h-full justify-center">
          <h2 className="text-white text-2xl font-bold mb-2">Bienvenue dans votre CRM/SCM</h2>
          <p className="text-blue-100 max-w-2xl">
            Gérez efficacement vos relations clients et votre chaîne d'approvisionnement avec Yachting Pyrénées Méditerranée.
          </p>
        </div>
      </div>
      
      {/* Widgets statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.id} className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <span className={`p-2 rounded-full ${stat.color} bg-opacity-20`}>
                  <Icon className={`h-5 w-5 ${stat.color} text-opacity-100`} />
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
                <span className="ml-2 text-sm font-medium text-green-600">{stat.change}</span>
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activité récente */}
        <Card title="Activité récente" className="lg:col-span-2">
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="py-3 flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-ypm-blue/10 flex items-center justify-center text-ypm-blue">
                  {activity.type === 'commande' && <ShoppingCartIcon className="h-5 w-5" />}
                  {activity.type === 'devis' && <DocumentTextIcon className="h-5 w-5" />}
                  {activity.type === 'livraison' && <TruckIcon className="h-5 w-5" />}
                  {activity.type === 'contact' && <UserGroupIcon className="h-5 w-5" />}
                  {activity.type === 'facture' && <DocumentTextIcon className="h-5 w-5" />}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Nouveau {activity.type}: {activity.ref}
                  </p>
                  <p className="text-sm text-gray-500">
                    Client: {activity.client} | il y a {activity.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        
        {/* Tâches à suivre */}
        <Card title="Tâches à suivre">
          <ul className="space-y-3">
            <li className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-ypm-blue rounded border-gray-300" />
              <span className="ml-3 text-sm text-gray-700">Relancer le client ABC Yachting</span>
              <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Urgent
              </span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-ypm-blue rounded border-gray-300" />
              <span className="ml-3 text-sm text-gray-700">Valider le devis #D-4821</span>
              <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Medium
              </span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-ypm-blue rounded border-gray-300" />
              <span className="ml-3 text-sm text-gray-700">Vérifier la livraison XDock #BL-0882</span>
              <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Urgent
              </span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-ypm-blue rounded border-gray-300" />
              <span className="ml-3 text-sm text-gray-700">Mettre à jour les prix fournisseurs</span>
              <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Normal
              </span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-ypm-blue rounded border-gray-300" />
              <span className="ml-3 text-sm text-gray-700">Rappeler le contact Jean Dupont</span>
              <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Medium
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;