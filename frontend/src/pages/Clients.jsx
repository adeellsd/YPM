import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoAdd, IoTrash, IoPencil, IoEye } from 'react-icons/io5';
import DataTable from '../components/tables/DataTable';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Clients = () => {
  // Données fictives pour l'exemple
  const [clients, setClients] = useState([
    {
      id: 1,
      nom: 'Yacht Azur',
      contact: 'Jean Dupont',
      email: 'contact@yachtazur.com',
      telephone: '+33 6 12 34 56 78',
      yacht: 'Azur One',
      statut: 'Actif',
    },
    {
      id: 2,
      nom: 'Médi Croisière',
      contact: 'Marie Martin',
      email: 'info@medicrosiere.fr',
      telephone: '+33 6 23 45 67 89',
      yacht: 'Médi Dream',
      statut: 'Actif',
    },
    {
      id: 3,
      nom: 'Sail & Sun',
      contact: 'Pierre Lambert',
      email: 'contact@sailsun.com',
      telephone: '+33 6 34 56 78 90',
      yacht: 'Sun Runner',
      statut: 'Inactif',
    },
    {
      id: 4,
      nom: 'Mediterranean Yacht Club',
      contact: 'Sophie Bernard',
      email: 'info@medyachtclub.com',
      telephone: '+33 6 45 67 89 01',
      yacht: 'Med Explorer',
      statut: 'Actif',
    },
    {
      id: 5,
      nom: 'Blue Ocean Charter',
      contact: 'Philippe Rousseau',
      email: 'contact@blueocean.fr',
      telephone: '+33 6 56 78 90 12',
      yacht: 'Ocean Blue II',
      statut: 'En attente',
    },
  ]);

  // Colonnes du tableau
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Nom',
      accessor: 'nom',
    },
    {
      Header: 'Contact',
      accessor: 'contact',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Téléphone',
      accessor: 'telephone',
    },
    {
      Header: 'Yacht',
      accessor: 'yacht',
    },
    {
      Header: 'Statut',
      accessor: 'statut',
      Cell: ({ value }) => {
        let badgeVariant = 'default';
        switch (value.toLowerCase()) {
          case 'actif':
            badgeVariant = 'success';
            break;
          case 'inactif':
            badgeVariant = 'danger';
            break;
          case 'en attente':
            badgeVariant = 'warning';
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
          <Link to={`/clients/${row.id}/view`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoEye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/clients/${row.id}/edit`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoPencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 text-red-600 hover:text-red-800"
            onClick={() => handleDeleteClient(row.id)}
          >
            <IoTrash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Fonction pour supprimer un client
  const handleDeleteClient = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setClients(clients.filter((client) => client.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-clash font-bold text-[#292F6A] tracking-[0.3em]">CLIENTS</h1>
        <Link to="/clients/new">
          <Button variant="primary" className="flex items-center">
            <IoAdd className="h-5 w-5 mr-1" />
            Nouveau client
          </Button>
        </Link>
      </div>

      <DataTable 
        columns={columns} 
        data={clients} 
        onRowClick={(row) => console.log('Client row clicked:', row)}
      />
    </div>
  );
};

export default Clients;