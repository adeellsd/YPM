import React from 'react';
import { Link } from 'react-router-dom';
import { IoBoat, IoPersonCircle, IoDocument, IoReceipt, IoCompass, IoStatsChart } from 'react-icons/io5';
import Card from '../components/common/Card';

const DashboardCard = ({ title, value, icon, color, link }) => {
  return (
    <Link to={link}>
      <Card className="h-full transition-transform hover:scale-105">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${color} text-white mr-4`}>
            {icon}
          </div>
          <div>
            <p className="text-gray-600 font-clash font-light">{title}</p>
            <p className="text-2xl font-clash font-bold text-[#292F6A]">{value}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const Dashboard = () => {
  // Données fictives pour le tableau de bord
  const stats = [
    { title: 'Clients', value: '24', icon: <IoPersonCircle size={24} />, color: 'bg-blue-500', link: '/clients' },
    { title: 'Commandes', value: '12', icon: <IoDocument size={24} />, color: 'bg-yellow-500', link: '/commandes' },
    { title: 'Livraisons', value: '8', icon: <IoCompass size={24} />, color: 'bg-green-500', link: '/livraisons' },
    { title: 'Factures', value: '16', icon: <IoReceipt size={24} />, color: 'bg-purple-500', link: '/factures' },
    { title: 'Fournisseurs', value: '6', icon: <IoBoat size={24} />, color: 'bg-red-500', link: '/fournisseurs' },
    { title: 'Projets', value: '4', icon: <IoStatsChart size={24} />, color: 'bg-indigo-500', link: '/xdock' },
  ];

  // Données fictives pour les activités récentes
  const recentActivities = [
    { id: 1, description: 'Nouvelle commande de Yacht Azur', time: 'Il y a 2 heures', status: 'En attente' },
    { id: 2, description: 'Livraison effectuée pour Médi Croisière', time: 'Il y a 5 heures', status: 'Complétée' },
    { id: 3, description: 'Facture #1203 payée', time: 'Hier', status: 'Payée' },
    { id: 4, description: 'Nouveau devis créé pour Sail & Sun', time: 'Hier', status: 'En attente' },
    { id: 5, description: 'Commande #45 modifiée', time: 'Il y a 2 jours', status: 'Modifiée' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-clash font-bold text-[#292F6A] tracking-[0.3em] mb-6">TABLEAU DE BORD</h1>
      
      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <DashboardCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            link={stat.link}
          />
        ))}
      </div>
      
      {/* Activités récentes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-clash font-bold text-[#292F6A] mb-4">Activités récentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">
                  Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-clash font-medium text-gray-900">
                    {activity.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-clash font-light text-gray-500">
                    {activity.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-clash font-medium rounded-full ${
                      activity.status === 'Complétée' ? 'bg-green-100 text-green-800' :
                      activity.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                      activity.status === 'Payée' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;