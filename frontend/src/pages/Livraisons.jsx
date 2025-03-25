import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoAdd, IoTrash, IoPencil, IoEye, IoCheckmark } from 'react-icons/io5';
import DataTable from '../components/tables/DataTable';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Livraisons = () => {
  const [livraisons, setLivraisons] = useState([
    {
      id: 'LIV-2023-001',
      commande: 'CMD-2023-001',
      client: 'Yacht Azur',
      date: '2023-03-16',
      adresse: 'Port de Saint-Tropez, Ponton B',
      statut: 'Livrée',
      livreur: 'Jean Dupont'
    },
    {
      id: 'LIV-2023-002',
      commande: 'CMD-2023-002',
      client: 'Médi Croisière',
      date: '2023-03-20',
      adresse: 'Port de Marseille, Quai 4',
      statut: 'En cours',
      livreur: 'Pierre Martin'
    },
    {
      id: 'LIV-2023-003',
      commande: 'CMD-2023-003',
      client: 'Sail & Sun',
      date: '2023-03-22',
      adresse: 'Port de Nice, Ponton A',
      statut: 'Planifiée',
      livreur: 'Sophie Bernard'
    },
    {
      id: 'LIV-2023-004',
      commande: 'CMD-2023-004',
      client: 'Mediterranean Yacht Club',
      date: '2023-03-24',
      adresse: 'Port de Cannes, Quai des Milliardaires',
      statut: 'Livrée',
      livreur: 'Marc Dubois'
    },
    {
      id: 'LIV-2023-005',
      commande: 'CMD-2023-005',
      client: 'Blue Ocean Charter',
      date: '2023-03-26',
      adresse: 'Port Camille Rayon, Golfe Juan',
      statut: 'Annulée',
      livreur: null
    },
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  const handleStatusChange = (id, newStatus) => {
    setLivraisons(livraisons.map(livraison => 
      livraison.id === id ? { ...livraison, statut: newStatus } : livraison
    ));
  };

  const handleDeleteLivraison = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette livraison ?')) {
      setLivraisons(livraisons.filter(livraison => livraison.id !== id));
    }
  };

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Commande',
      accessor: 'commande',
      Cell: ({ value }) => (
        <Link to={`/commandes/${value}`} className="text-[#292F6A] hover:underline">
          {value}
        </Link>
      )
    },
    {
      Header: 'Client',
      accessor: 'client',
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ value }) => formatDate(value),
    },
    {
      Header: 'Adresse',
      accessor: 'adresse',
    },
    {
      Header: 'Livreur',
      accessor: 'livreur',
      Cell: ({ value }) => value || 'Non assigné',
    },
    {
      Header: 'Statut',
      accessor: 'statut',
      Cell: ({ value }) => {
        let badgeVariant = 'default';
        switch (value.toLowerCase()) {
          case 'livrée':
            badgeVariant = 'success';
            break;
          case 'en cours':
            badgeVariant = 'primary';
            break;
          case 'planifiée':
            badgeVariant = 'info';
            break;
          case 'annulée':
            badgeVariant = 'danger';
            break;
          default:
            badgeVariant = 'default';
        }
        return <Badge variant={badgeVariant}>{value}</Badge>;
      },
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      sortable: false,
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link to={`/livraisons/${row.id}/view`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoEye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/livraisons/${row.id}/edit`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoPencil className="h-4 w-4" />
            </Button>
          </Link>
          {row.statut === 'Planifiée' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 text-green-600"
              onClick={() => handleStatusChange(row.id, 'En cours')}
              title="Marquer comme en cours"
            >
              <IoCheckmark className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 text-red-600 hover:text-red-800"
            onClick={() => handleDeleteLivraison(row.id)}
          >
            <IoTrash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-clash font-bold text-[#292F6A] tracking-[0.3em]">LIVRAISONS</h1>
        <Link to="/livraisons/new">
          <Button variant="primary" className="flex items-center">
            <IoAdd className="h-5 w-5 mr-1" />
            Nouvelle livraison
          </Button>
        </Link>
      </div>

      <DataTable 
        columns={columns} 
        data={livraisons}
      />
    </div>
  );
};

export default Livraisons;