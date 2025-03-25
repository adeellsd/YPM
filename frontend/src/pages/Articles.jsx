import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoAdd, IoTrash, IoPencil, IoEye } from 'react-icons/io5';
import DataTable from '../components/tables/DataTable';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Articles = () => {
  const [articles, setArticles] = useState([
    {
      id: 'ART-001',
      nom: 'Champagne Dom Pérignon Vintage',
      categorie: 'Boissons',
      prix: 199.50,
      unite: 'Bouteille',
      fournisseur: 'Côte d\'Azur Boissons',
      stock: 24,
      statut: 'En stock'
    },
    {
      id: 'ART-002',
      nom: 'Caviar Osciètre Royal',
      categorie: 'Alimentation',
      prix: 145.75,
      unite: '50g',
      fournisseur: 'Méditerranée Provisions',
      stock: 15,
      statut: 'En stock'
    },
    {
      id: 'ART-003',
      nom: 'Homard Bleu de Bretagne',
      categorie: 'Alimentation',
      prix: 62.80,
      unite: 'kg',
      fournisseur: 'Méditerranée Provisions',
      stock: 8,
      statut: 'Stock bas'
    },
    {
      id: 'ART-004',
      nom: 'Eau Evian Premium',
      categorie: 'Boissons',
      prix: 3.25,
      unite: 'Bouteille',
      fournisseur: 'Côte d\'Azur Boissons',
      stock: 48,
      statut: 'En stock'
    },
    {
      id: 'ART-005',
      nom: 'Truffe Noire du Périgord',
      categorie: 'Alimentation',
      prix: 85.00,
      unite: '100g',
      fournisseur: 'Provence Gourmet',
      stock: 0,
      statut: 'Rupture'
    },
  ]);

  const formatPrix = (prix) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(prix);
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  const columns = [
    {
      Header: 'Réf.',
      accessor: 'id',
    },
    {
      Header: 'Nom',
      accessor: 'nom',
    },
    {
      Header: 'Catégorie',
      accessor: 'categorie',
    },
    {
      Header: 'Prix',
      accessor: 'prix',
      Cell: ({ value }) => formatPrix(value),
    },
    {
      Header: 'Unité',
      accessor: 'unite',
    },
    {
      Header: 'Fournisseur',
      accessor: 'fournisseur',
    },
    {
      Header: 'Stock',
      accessor: 'stock',
    },
    {
      Header: 'Statut',
      accessor: 'statut',
      Cell: ({ value }) => {
        let badgeVariant = 'default';
        switch (value.toLowerCase()) {
          case 'en stock':
            badgeVariant = 'success';
            break;
          case 'stock bas':
            badgeVariant = 'warning';
            break;
          case 'rupture':
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
          <Link to={`/articles/${row.id}/view`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoEye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/articles/${row.id}/edit`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoPencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 text-red-600 hover:text-red-800"
            onClick={() => handleDeleteArticle(row.id)}
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
        <h1 className="text-2xl font-clash font-bold text-[#292F6A] tracking-[0.3em]">ARTICLES</h1>
        <Link to="/articles/new">
          <Button variant="primary" className="flex items-center">
            <IoAdd className="h-5 w-5 mr-1" />
            Nouvel article
          </Button>
        </Link>
      </div>

      <DataTable 
        columns={columns} 
        data={articles} 
      />
    </div>
  );
};

export default Articles;