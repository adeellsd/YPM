import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const XDock = () => {
  // Données fictives pour les statistiques
  const [stats] = useState({
    totalYachts: 28,
    yachtsActifs: 22,
    commandesMois: 45,
    chiffreAffaires: 187650.25,
    evolution: 12.5,
  });

  // Données fictives pour le graphique
  const chartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Chiffre d\'affaires (k€)',
        data: [110, 95, 125, 140, 160, 180, 210, 235, 190, 170, 155, 130],
        borderColor: '#292F6A',
        backgroundColor: 'rgba(41, 47, 106, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Nombre de commandes',
        data: [32, 28, 35, 42, 48, 52, 65, 70, 55, 48, 40, 36],
        borderColor: '#F6F3D0',
        backgroundColor: 'rgba(246, 243, 208, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance annuelle',
        font: {
          family: 'Clash Display',
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

  // Données fictives pour les dernières activités
  const [recentActivities] = useState([
    {
      id: 1,
      type: 'Commande',
      description: 'Nouvelle commande #CMD-2023-045',
      yacht: 'Azur One',
      date: '2023-03-25',
      statut: 'Validée',
    },
    {
      id: 2,
      type: 'Livraison',
      description: 'Livraison #LIV-2023-032 effectuée',
      yacht: 'Médi Dream',
      date: '2023-03-24',
      statut: 'Terminée',
    },
    {
      id: 3,
      type: 'Devis',
      description: 'Devis #DEV-2023-018 accepté',
      yacht: 'Ocean Blue II',
      date: '2023-03-23',
      statut: 'Accepté',
    },
    {
      id: 4,
      type: 'Facture',
      description: 'Facture #FAC-2023-029 payée',
      yacht: 'Sun Runner',
      date: '2023-03-22',
      statut: 'Payée',
    },
    {
      id: 5,
      type: 'Client',
      description: 'Nouveau client ajouté',
      yacht: 'Med Explorer',
      date: '2023-03-21',
      statut: 'Nouveau',
    },
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-clash font-bold text-[#292F6A] tracking-[0.3em] mb-6">X-DOCK</h1>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card className="bg-[#292F6A] text-white">
          <h3 className="text-lg font-clash font-medium mb-2">Total Yachts</h3>
          <p className="text-3xl font-clash font-bold">{stats.totalYachts}</p>
          <p className="text-sm font-clash font-light mt-2">Dont {stats.yachtsActifs} actifs</p>
        </Card>
        
        <Card className="bg-[#F6F3D0] text-[#292F6A]">
          <h3 className="text-lg font-clash font-medium mb-2">Commandes</h3>
          <p className="text-3xl font-clash font-bold">{stats.commandesMois}</p>
          <p className="text-sm font-clash font-light mt-2">Ce mois-ci</p>
        </Card>
        
        <Card className="bg-[#E2E2E2] text-[#292F6A]">
          <h3 className="text-lg font-clash font-medium mb-2">Chiffre d'affaires</h3>
          <p className="text-3xl font-clash font-bold">{formatCurrency(stats.chiffreAffaires)}</p>
          <p className="text-sm font-clash font-light mt-2 flex items-center">
            <span className={stats.evolution > 0 ? 'text-green-600' : 'text-red-600'}>
              {stats.evolution > 0 ? '+' : ''}{stats.evolution}%
            </span>
            <span className="ml-1">vs mois dernier</span>
          </p>
        </Card>
        
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-clash font-medium mb-2 text-[#292F6A]">Activité récente</h3>
          <div className="space-y-2">
            {recentActivities.slice(0, 3).map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <span className="text-sm font-clash font-medium">{activity.type}</span>
                  <p className="text-xs font-clash font-light">{activity.description}</p>
                </div>
                <Badge variant={
                  activity.statut === 'Validée' || activity.statut === 'Terminée' || activity.statut === 'Payée' || activity.statut === 'Accepté'
                    ? 'success'
                    : activity.statut === 'Nouveau'
                    ? 'primary'
                    : 'default'
                }>
                  {activity.statut}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Graphique */}
      <Card className="mb-8">
        <Line data={chartData} options={chartOptions} />
      </Card>

      {/* Activités récentes */}
      <Card title="Dernières activités">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">Yacht</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-clash font-medium text-gray-900">{activity.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-clash font-light text-gray-900">{activity.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-clash font-light text-gray-900">{activity.yacht}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-clash font-light text-gray-900">{formatDate(activity.date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={
                      activity.statut === 'Validée' || activity.statut === 'Terminée' || activity.statut === 'Payée' || activity.statut === 'Accepté'
                        ? 'success'
                        : activity.statut === 'Nouveau'
                        ? 'primary'
                        : 'default'
                    }>
                      {activity.statut}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default XDock;