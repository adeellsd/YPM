import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoAdd, IoTrash, IoPencil, IoEye, IoDownload, IoMail, IoCheckmarkCircle } from 'react-icons/io5';
import DataTable from '../components/tables/DataTable';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Devis = () => {
  const [devis, setDevis] = useState([
    {
      id: 'DEV-2023-001',
      client: 'Yacht Azur',
      date: '2023-03-10',
      montant: 2850.75,
      statut: 'Accepté',
      validite: '2023-04-10'
    },
    {
      id: 'DEV-2023-002',
      client: 'Médi Croisière',
      date: '2023-03-15',
      montant: 1950.25,
      statut: 'En attente',
      validite: '2023-04-15'
    },
    {
      id: 'DEV-2023-003',
      client: 'Sail & Sun',
      date: '2023-03-18',
      montant: 3420.90,
      statut: 'Refusé',
      validite: '2023-04-18'
    },
    {
      id: 'DEV-2023-004',
      client: 'Mediterranean Yacht Club',
      date: '2023-03-20',
      montant: 5860.50,
      statut: 'Accepté',
      validite: '2023-04-20'
    },
    {
      id: 'DEV-2023-005',
      client: 'Blue Ocean Charter',
      date: '2023-03-22',
      montant: 2120.30,
      statut: 'En attente',
      validite: '2023-04-22'
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

  const handleDeleteDevis = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
      setDevis(devis.filter(d => d.id !== id));
    }
  };

  const handleConvertToCommande = (id) => {
    alert(`Conversion du devis ${id} en commande...`);
    // Logique de conversion
  };

  const handleSendEmail = (id) => {
    alert(`Envoi du devis ${id} par email...`);
    // Logique d'envoi par email
  };

  const handleDownload = (id) => {
    alert(`Téléchargement du devis ${id}...`);
    // Logique de téléchargement
  };

  const columns = [
    {
      Header: 'N° Devis',
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
          case 'accepté':
            badgeVariant = 'success';
            break;
          case 'en attente':
            badgeVariant = 'warning';
            break;
          case 'refusé':
            badgeVariant = 'danger';
            break;
          default:
            badgeVariant = 'default';
        }
        return <Badge variant={badgeVariant}>{value}</Badge>;
      },
    },
    {
      Header: 'Validité',
      accessor: 'validite',
      Cell: ({ value }) => formatDate(value),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      sortable: false,
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link to={`/devis/${row.id}/view`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoEye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/devis/${row.id}/edit`}>
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
          {row.statut === 'Accepté' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 text-purple-600"
              onClick={() => handleConvertToCommande(row.id)}
              title="Convertir en commande"
            >
              <IoCheckmarkCircle className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 text-red-600 hover:text-red-800"
            onClick={() => handleDeleteDevis(row.id)}
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
        <h1 className="text-2xl font-clash font-bold text-[#292F6A] tracking-[0.3em]">DEVIS</h1>
        <Link to="/devis/new">
          <Button variant="primary" className="flex items-center">
            <IoAdd className="h-5 w-5 mr-1" />
            Nouveau devis
          </Button>
        </Link>
      </div>

      <DataTable 
        columns={columns} 
        data={devis}
      />
    </div>
  );
};

export default Devis;