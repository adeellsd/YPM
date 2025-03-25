import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoAdd, IoTrash, IoPencil, IoEye, IoDownload } from 'react-icons/io5';
import DataTable from '../components/tables/DataTable';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Commandes = () => {
  // Données fictives pour l'exemple
  const [commandes, setCommandes] = useState([
    {
      id: 'CMD-2023-001',
      client: 'Yacht Azur',
      date: '2023-03-15',
      montant: 2850.75,
      statut: 'Livrée',
      paiement: 'Payée',
    },
    {
      id: 'CMD-2023-002',
      client: 'Médi Croisière',
      date: '2023-03-18',
      montant: 1950.25,
      statut: 'En préparation',
      paiement: 'En attente',
    },
    {
      id: 'CMD-2023-003',
      client: 'Sail & Sun',
      date: '2023-03-20',
      montant: 3420.90,
      statut: 'Validée',
      paiement: 'Payée',
    },
    {
      id: 'CMD-2023-004',
      client: 'Mediterranean Yacht Club',
      date: '2023-03-22',
      montant: 5860.50,
      statut: 'Livrée',
      paiement: 'Payée',
    },
    {
      id: 'CMD-2023-005',
      client: 'Blue Ocean Charter',
      date: '2023-03-25',
      montant: 2120.30,
      statut: 'Annulée',
      paiement: 'Remboursée',
    },
  ]);

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  // Formater le montant
  const formatMontant = (montant) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(montant);
  };

  // Colonnes du tableau
  const columns = [
    {
      Header: 'N° Commande',
      accessor: 'id',
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
      Header: 'Montant',
      accessor: 'montant',
      Cell: ({ value }) => formatMontant(value),
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
          case 'en préparation':
            badgeVariant = 'info';
            break;
          case 'validée':
            badgeVariant = 'primary';
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
      Header: 'Paiement',
      accessor: 'paiement',
      Cell: ({ value }) => {
        let badgeVariant = 'default';
        switch (value.toLowerCase()) {
          case 'payée':
            badgeVariant = 'success';
            break;
          case 'en attente':
            badgeVariant = 'warning';
            break;
          case 'remboursée':
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
          <Link to={`/commandes/${row.id}/view`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoEye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/commandes/${row.id}/edit`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoPencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1"
            onClick={() => handleDownloadCommande(row.id)}
          >
            <IoDownload className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 text-red-600 hover:text-red-800"
            onClick={() => handleDeleteCommande(row.id)}
          >
            <IoTrash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Fonction pour télécharger une commande
  const handleDownloadCommande = (id) => {
    console.log(`Téléchargement de la commande ${id}`);
    // Implémentation du téléchargement ici
  };

  // Fonction pour supprimer une commande
  const handleDeleteCommande = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      setCommandes(commandes.filter((commande) => commande.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-clash font-bold text-[#292F6A] tracking-[0.3em]">COMMANDES</h1>
        <Link to="/commandes/new">
          <Button variant="primary" className="flex items-center">
            <IoAdd className="h-5 w-5 mr-1" />
            Nouvelle commande
          </Button>
        </Link>
      </div>

      <DataTable 
        columns={columns} 
        data={commandes} 
        onRowClick={(row) => console.log('Commande row clicked:', row)}
      />
    </div>
  );
};

export default Commandes;