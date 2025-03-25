import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoAdd, IoTrash, IoPencil, IoEye, IoDownload, IoMail } from 'react-icons/io5';
import DataTable from '../components/tables/DataTable';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Factures = () => {
  const [factures, setFactures] = useState([
    {
      id: 'FAC-2023-001',
      commande: 'CMD-2023-001',
      client: 'Yacht Azur',
      date: '2023-03-17',
      montant: 2850.75,
      statut: 'Payée',
      date_paiement: '2023-03-20'
    },
    {
      id: 'FAC-2023-002',
      commande: 'CMD-2023-002',
      client: 'Médi Croisière',
      date: '2023-03-20',
      montant: 1950.25,
      statut: 'En attente',
      date_paiement: null
    },
    {
      id: 'FAC-2023-003',
      commande: 'CMD-2023-003',
      client: 'Sail & Sun',
      date: '2023-03-22',
      montant: 3420.90,
      statut: 'Payée',
      date_paiement: '2023-03-25'
    },
    {
      id: 'FAC-2023-004',
      commande: 'CMD-2023-004',
      client: 'Mediterranean Yacht Club',
      date: '2023-03-24',
      montant: 5860.50,
      statut: 'Payée',
      date_paiement: '2023-03-26'
    },
    {
      id: 'FAC-2023-005',
      commande: 'CMD-2023-005',
      client: 'Blue Ocean Charter',
      date: '2023-03-26',
      montant: 2120.30,
      statut: 'Annulée',
      date_paiement: null
    },
  ]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  const formatMontant = (montant) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(montant);
  };

  const handleDeleteFacture = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      setFactures(factures.filter(facture => facture.id !== id));
    }
  };

  const handleSendEmail = (id) => {
    alert(`Envoi de la facture ${id} par email...`);
    // Logique d'envoi par email
  };

  const handleDownload = (id) => {
    alert(`Téléchargement de la facture ${id}...`);
    // Logique de téléchargement
  };

  const columns = [
    {
      Header: 'N° Facture',
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
          case 'payée':
            badgeVariant = 'success';
            break;
          case 'en attente':
            badgeVariant = 'warning';
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
      Header: 'Date paiement',
      accessor: 'date_paiement',
      Cell: ({ value }) => formatDate(value),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      sortable: false,
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link to={`/factures/${row.id}/view`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoEye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/factures/${row.id}/edit`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoPencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 text-blue-600"
            onClick={() => handleDownload(row.id)}
          >
            <IoDownload className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 text-green-600"
            onClick={() => handleSendEmail(row.id)}
          >
            <IoMail className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 text-red-600 hover:text-red-800"
            onClick={() => handleDeleteFacture(row.id)}
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
        <h1 className="text-2xl font-clash font-bold text-[#292F6A] tracking-[0.3em]">FACTURES</h1>
        <Link to="/factures/new">
          <Button variant="primary" className="flex items-center">
            <IoAdd className="h-5 w-5 mr-1" />
            Nouvelle facture
          </Button>
        </Link>
      </div>

      <DataTable 
        columns={columns} 
        data={factures}
      />
    </div>
  );
};

export default Factures;