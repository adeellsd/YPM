import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoAdd, IoTrash, IoPencil, IoEye } from 'react-icons/io5';
import DataTable from '../components/tables/DataTable';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import axios from 'axios';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données des clients depuis l'API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://10.27.20.200:3000/api/clients');
        setClients(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des clients:', err);
        setError('Impossible de charger les clients. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Fonction pour supprimer un client
  const handleDeleteClient = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      try {
        await axios.delete(`http://10.27.20.200:3000/api/clients/${id}`);
        setClients(clients.filter((client) => client.id !== id));
      } catch (err) {
        console.error('Erreur lors de la suppression du client:', err);
        alert('Erreur lors de la suppression du client. Veuillez réessayer.');
      }
    }
  };

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
        switch (value?.toLowerCase()) {
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

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#292F6A]"></div>
        </div>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

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