import React, { useState } from 'react';
import DataTable from '../components/tables/DataTable';
import FormWrapper from '../components/forms/FormWrapper';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';
import Badge from '../components/common/Badge';

const Articles = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [articles, setArticles] = useState([
    { 
      id: 1, 
      refArticle: 'ART001', 
      refFournisseur: 'F12345', 
      designation: 'Cordage nautique 12mm', 
      prixAchat: 8.75, 
      tauxTVA: 20,
      conditionnement: 'Bobine',
      uniteConditionnement: 'mètre',
      typeArticle: 'Sec',
      familleArticle: 'Cordages',
      sousFamilleArticle: 'Standard',
      sousSousFamilleArticle: '',
      bio: false,
      consigne: false,
      paysOrigine: 'France',
      regionOrigine: 'PACA',
      fournisseurId: 1
    },
    { 
      id: 2, 
      refArticle: 'ART002', 
      refFournisseur: 'F23456', 
      designation: 'Petit matériel nautique - Kit débutant', 
      prixAchat: 45.50, 
      tauxTVA: 20,
      conditionnement: 'Kit',
      uniteConditionnement: 'pièce',
      typeArticle: 'Non alimentaire',
      familleArticle: 'Accessoires',
      sousFamilleArticle: 'Kits',
      sousSousFamilleArticle: 'Débutant',
      bio: false,
      consigne: false,
      paysOrigine: 'Italie',
      regionOrigine: '',
      fournisseurId: 2
    },
    { 
      id: 3, 
      refArticle: 'ART003', 
      refFournisseur: 'FOOD789', 
      designation: 'Caviar d\'Aquitaine', 
      prixAchat: 124.90, 
      tauxTVA: 5.5,
      conditionnement: 'Pot',
      uniteConditionnement: 'gramme',
      typeArticle: 'Frais',
      familleArticle: 'Alimentation',
      sousFamilleArticle: 'Luxe',
      sousSousFamilleArticle: 'Caviar',
      bio: true,
      consigne: false,
      paysOrigine: 'France',
      regionOrigine: 'Aquitaine',
      fournisseurId: 3
    },
    { 
      id: 4, 
      refArticle: 'ART004', 
      refFournisseur: 'BEV123', 
      designation: 'Champagne Brut', 
      prixAchat: 32.50, 
      tauxTVA: 20,
      conditionnement: 'Bouteille',
      uniteConditionnement: 'pièce',
      typeArticle: 'Sec',
      familleArticle: 'Boissons',
      sousFamilleArticle: 'Alcools',
      sousSousFamilleArticle: 'Champagne',
      bio: false,
      consigne: true,
      paysOrigine: 'France',
      regionOrigine: 'Champagne',
      fournisseurId: 1
    },
    { 
      id: 5, 
      refArticle: 'ART005', 
      refFournisseur: 'EQUIP321', 
      designation: 'Gilet de sauvetage homologué', 
      prixAchat: 78.40, 
      tauxTVA: 20,
      conditionnement: 'Carton',
      uniteConditionnement: 'pièce',
      typeArticle: 'Non alimentaire',
      familleArticle: 'Sécurité',
      sousFamilleArticle: 'Équipements obligatoires',
      sousSousFamilleArticle: 'Gilets',
      bio: false,
      consigne: false,
      paysOrigine: 'Espagne',
      regionOrigine: '',
      fournisseurId: 2
    },
  ]);

  // Formulaire
  const [formData, setFormData] = useState({
    refArticle: '',
    refFournisseur: '',
    designation: '',
    prixAchat: '',
    tauxTVA: '',
    conditionnement: '',
    uniteConditionnement: '',
    typeArticle: '',
    familleArticle: '',
    sousFamilleArticle: '',
    sousSousFamilleArticle: '',
    bio: false,
    consigne: false,
    paysOrigine: '',
    regionOrigine: '',
    fournisseurId: ''
  });

  // Options pour les listes déroulantes
  const typeArticleOptions = [
    { value: 'Ultra frais', label: 'Ultra frais' },
    { value: 'Frais', label: 'Frais' },
    { value: 'Frais Gel', label: 'Frais Gel' },
    { value: 'Sec', label: 'Sec' },
    { value: 'Non alimentaire', label: 'Non alimentaire' }
  ];

  const uniteOptions = [
    { value: 'kg', label: 'Kilogramme (kg)' },
    { value: 'litre', label: 'Litre (L)' },
    { value: 'pièce', label: 'Pièce' },
    { value: 'carton', label: 'Carton' },
    { value: 'palette', label: 'Palette' },
    { value: 'mètre', label: 'Mètre' },
    { value: 'gramme', label: 'Gramme' }
  ];

  const tauxTVAOptions = [
    { value: '5.5', label: '5.5%' },
    { value: '10', label: '10%' },
    { value: '20', label: '20%' }
  ];

  const fournisseursOptions = [
    { value: '1', label: 'Marine Supply Co.' },
    { value: '2', label: 'Yacht Equipment Ltd' },
    { value: '3', label: 'Express Shipping' },
    { value: '4', label: 'Office Supplies' },
    { value: '5', label: 'Boat Parts Wholesale' }
  ];

  // Colonnes pour le tableau
  const columns = [
    { header: 'Référence', accessor: 'refArticle' },
    { header: 'Désignation', accessor: 'designation' },
    { header: 'Prix Achat', accessor: 'prixAchat', render: (value) => `${value.toFixed(2)} €` },
    { header: 'Type', accessor: 'typeArticle' },
    { 
      header: 'Bio', 
      accessor: 'bio', 
      render: (value) => value ? 
        <Badge variant="success">Bio</Badge> : 
        <Badge variant="default">Non Bio</Badge> 
    },
    { 
      header: 'Consigné', 
      accessor: 'consigne', 
      render: (value) => value ? 
        <Badge variant="primary">Consigné</Badge> : 
        <Badge variant="default">Non Consigné</Badge> 
    }
  ];

  // Gérer l'ouverture du formulaire d'ajout
  const handleAddClick = () => {
    setCurrentArticle(null);
    setFormData({
      refArticle: '',
      refFournisseur: '',
      designation: '',
      prixAchat: '',
      tauxTVA: '',
      conditionnement: '',
      uniteConditionnement: '',
      typeArticle: '',
      familleArticle: '',
      sousFamilleArticle: '',
      sousSousFamilleArticle: '',
      bio: false,
      consigne: false,
      paysOrigine: '',
      regionOrigine: '',
      fournisseurId: ''
    });
    setShowForm(true);
  };

  // Gérer l'ouverture du formulaire de modification
  const handleEditClick = (article) => {
    setCurrentArticle(article);
    setFormData({
      refArticle: article.refArticle,
      refFournisseur: article.refFournisseur,
      designation: article.designation,
      prixAchat: article.prixAchat,
      tauxTVA: article.tauxTVA.toString(),
      conditionnement: article.conditionnement,
      uniteConditionnement: article.uniteConditionnement,
      typeArticle: article.typeArticle,
      familleArticle: article.familleArticle,
      sousFamilleArticle: article.sousFamilleArticle,
      sousSousFamilleArticle: article.sousSousFamilleArticle,
      bio: article.bio,
      consigne: article.consigne,
      paysOrigine: article.paysOrigine,
      regionOrigine: article.regionOrigine,
      fournisseurId: article.fournisseurId.toString()
    });
    setShowForm(true);
  };

  // Gérer la suppression
  const handleDeleteClick = (article) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'article ${article.designation} ?`)) {
      setArticles(articles.filter(a => a.id !== article.id));
    }
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const processedData = {
      ...formData,
      prixAchat: parseFloat(formData.prixAchat),
      tauxTVA: parseFloat(formData.tauxTVA),
      fournisseurId: parseInt(formData.fournisseurId)
    };
    
    if (currentArticle) {
      // Mise à jour d'un article existant
      setArticles(articles.map(article => 
        article.id === currentArticle.id ? { ...article, ...processedData } : article
      ));
    } else {
      // Ajout d'un nouvel article
      const newArticle = {
        id: articles.length + 1,
        ...processedData
      };
      setArticles([...articles, newArticle]);
    }
    
    // Fermer le formulaire
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Articles</h1>
      </div>
      
      {showForm ? (
        <FormWrapper
          title={currentArticle ? "Modifier l'article" : "Ajouter un article"}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Référence Article"
              name="refArticle"
              value={formData.refArticle}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Référence Fournisseur"
              name="refFournisseur"
              value={formData.refFournisseur}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Fournisseur"
              name="fournisseurId"
              value={formData.fournisseurId}
              onChange={handleInputChange}
              options={fournisseursOptions}
              required
            />
            <div className="md:col-span-3">
              <InputField
                label="Désignation"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
              />
            </div>
            <InputField
              label="Prix Achat (€)"
              name="prixAchat"
              type="number"
              step="0.01"
              value={formData.prixAchat}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Taux TVA"
              name="tauxTVA"
              value={formData.tauxTVA}
              onChange={handleInputChange}
              options={tauxTVAOptions}
              required
            />
            <InputField
              label="Conditionnement"
              name="conditionnement"
              value={formData.conditionnement}
              onChange={handleInputChange}
              placeholder="ex: Carton, Bobine, Bouteille"
              required
            />
            <SelectField
              label="Unité Conditionnement"
              name="uniteConditionnement"
              value={formData.uniteConditionnement}
              onChange={handleInputChange}
              options={uniteOptions}
              required
            />
            <SelectField
              label="Type Article"
              name="typeArticle"
              value={formData.typeArticle}
              onChange={handleInputChange}
              options={typeArticleOptions}
              required
            />
            <InputField
              label="Famille Article"
              name="familleArticle"
              value={formData.familleArticle}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Sous Famille Article"
              name="sousFamilleArticle"
              value={formData.sousFamilleArticle}
              onChange={handleInputChange}
            />
            <InputField
              label="Sous Sous Famille Article"
              name="sousSousFamilleArticle"
              value={formData.sousSousFamilleArticle}
              onChange={handleInputChange}
            />
            <div className="flex items-center">
              <input
                id="bio"
                name="bio"
                type="checkbox"
                checked={formData.bio}
                onChange={handleInputChange}
                className="h-4 w-4 text-ypm-blue focus:ring-ypm-light border-gray-300 rounded"
              />
              <label htmlFor="bio" className="ml-2 block text-sm text-gray-900">
                Produit Bio
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="consigne"
                name="consigne"
                type="checkbox"
                checked={formData.consigne}
                onChange={handleInputChange}
                className="h-4 w-4 text-ypm-blue focus:ring-ypm-light border-gray-300 rounded"
              />
              <label htmlFor="consigne" className="ml-2 block text-sm text-gray-900">
                Produit Consigné
              </label>
            </div>
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Pays d'origine"
                name="paysOrigine"
                value={formData.paysOrigine}
                onChange={handleInputChange}
              />
              <InputField
                label="Région d'origine"
                name="regionOrigine"
                value={formData.regionOrigine}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </FormWrapper>
      ) : (
        <DataTable
          title="Liste des articles"
          columns={columns}
          data={articles}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          addButtonText="Ajouter un article"
        />
      )}
    </div>
  );
};

export default Articles;