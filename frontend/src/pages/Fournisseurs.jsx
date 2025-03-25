import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoAdd, IoTrash, IoPencil, IoEye } from 'react-icons/io5';
import DataTable from '../components/tables/DataTable';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Fournisseurs = () => {
  const [fournisseurs, setFournisseurs] = useState([
    {
      id: 1,
      nom: 'Méditerranée Provisions',
      contact: 'Robert Mercier',
      email: 'contact@mediprovisions.com',
      telephone: '+33 4 93 12 34 56',
      adresse: '23 Avenue du Port, 06600 Antibes',
      categorie: 'Alimentation',
      statut: 'Actif',
    },
    {
      id: 2,
      nom: 'Marine Supplies Co.',
      contact: 'Julien Lefort',
      email: 'info@marinesupplies.fr',
      telephone: '+33 4 93 23 45 67',
      adresse: '14 Rue du Quai, 06400 Cannes',
      categorie: 'Équipement',
      statut: 'Actif',
    },
    {
      id: 3,
      nom: 'Côte d\'Azur Boissons',
      contact: 'Sophie Leclerc',
      email: 'commandes@ca-boissons.com',
      telephone: '+33 4 92 34 56 78',
      adresse: '45 Boulevard Maritime, 06310 Beaulieu-sur-Mer',
      categorie: 'Boissons',
      statut: 'Actif',
    },
    {
      id: 4,
      nom: 'Provence Gourmet',
      contact: 'Michel Blanc',
      email: 'contact@provencegourmet.fr',
      telephone: '+33 4 94 45 67 89',
      adresse: '78 Avenue des Pins, 83990 Saint-Tropez',
      categorie: 'Alimentation',
      statut: 'Inactif',
    },
    {
      id: 5,
      nom: 'Riviera Yacht Services',
      contact: 'Pierre Durand',
      email: 'info@rivierayacht.com',
      telephone: '+33 4 93 56 78 90',
      adresse: '32 Quai des Yachts, 06600 Antibes',
      categorie: 'Services',
      statut: 'Actif',
    },
  ]);

  const handleDeleteFournisseur = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      setFournisseurs(fournisseurs.filter(fournisseur => fournisseur.id !== id));
    }
  };

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
      Header: 'Catégorie',
      accessor: 'categorie',
    },
    {
      Header: 'Statut',
      accessor: 'statut',
      Cell: ({ value }) => {
        let badgeVariant = value.toLowerCase() === 'actif' ? 'success' : 'danger';
        return <Badge variant={badgeVariant}>{value}</Badge>;
      },
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      sortable: false,
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link to={`/fournisseurs/${row.id}/view`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoEye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/fournisseurs/${row.id}/edit`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoPencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 text-red-600 hover:text-red-800"
            onClick={() => handleDeleteFournisseur(row.id)}
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
        <h1 className="text-2xl font-clash font-bold text-[#292F6A] tracking-[0.3em]">FOURNISSEURS</h1>
        <Link to="/fournisseurs/new">
          <Button variant="primary" className="flex items-center">
            <IoAdd className="h-5 w-5 mr-1" />
            Nouveau fournisseur
          </Button>
        </Link>
      </div>

      <DataTable 
        columns={columns} 
        data={fournisseurs} 
      />
    </div>
  );
};

export default Fournisseurs;