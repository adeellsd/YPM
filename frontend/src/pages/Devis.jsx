import React, { useState } from 'react';
import DataTable from '../components/tables/DataTable';
import FormWrapper from '../components/forms/FormWrapper';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const Devis = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentDevis, setCurrentDevis] = useState(null);
  
  // Données fictives pour les devis
  const [devis, setDevis] = useState([
    { 
      id: 1, 
      contactClient: 'Jean Dupont', 
      contactYPM: 'Admin YPM',
      siretClient: '12345678900010',
      dateDevis: '2025-03-15',
      dateFinValidite: '2025-04-15',
      delaiPaiement: '30 jours',
      dateValidation: null,
      remise: 5,
      statut: 'attente',
      total: 1250.75,
      details: [
        { id: 1, refArticle: 'ART001', designation: 'Cordage nautique 12mm', conditionnement: 'Bobine', quantite: 50, prixVente: 12.50 },
        { id: 2, refArticle: 'ART002', designation: 'Petit matériel nautique - Kit débutant', conditionnement: 'Kit', quantite: 2, prixVente: 49.95 }
      ]
    },
    { 
      id: 2, 
      contactClient: 'Sophie Martin', 
      contactYPM: 'Admin YPM',
      siretClient: '23456789000020',
      dateDevis: '2025-03-10',
      dateFinValidite: '2025-04-10',
      delaiPaiement: '45 jours',
      dateValidation: '2025-03-12',
      remise: 0,
      statut: 'converti',
      total: 3567.20,
      details: [
        { id: 3, refArticle: 'ART003', designation: 'Caviar d\'Aquitaine', conditionnement: 'Pot', quantite: 5, prixVente: 149.90 },
        { id: 4, refArticle: 'ART004', designation: 'Champagne Brut', conditionnement: 'Bouteille', quantite: 24, prixVente: 39.95 },
        { id: 5, refArticle: 'ART005', designation: 'Gilet de sauvetage homologué', conditionnement: 'Carton', quantite: 10, prixVente: 89.95 }
      ]
    },
    { 
      id: 3, 
      contactClient: 'Philippe Leroy', 
      contactYPM: 'Admin YPM',
      siretClient: '34567890000030',
      dateDevis: '2025-03-05',
      dateFinValidite: '2025-04-05',
      delaiPaiement: '30 jours',
      dateValidation: null,
      remise: 10,
      statut: 'refusé',
      total: 875.40,
      details: [
        { id: 6, refArticle: 'ART002', designation: 'Petit matériel nautique - Kit débutant', conditionnement: 'Kit', quantite: 5, prixVente: 47.50 },
        { id: 7, refArticle: 'ART005', designation: 'Gilet de sauvetage homologué', conditionnement: 'Carton', quantite: 8, prixVente: 82.95 }
      ]
    }
  ]);

  // Données pour la création/édition
  const [formData, setFormData] = useState({
    contactClient: '',
    contactYPM: 'Admin YPM',
    siretClient: '',
    dateDevis: new Date().toISOString().split('T')[0],
    dateFinValidite: '',
    delaiPaiement: '',
    remise: 0,
    statut: 'attente',
    details: []
  });

  // Données pour les listes déroulantes
  const contactsClientOptions = [
    { value: 'Jean Dupont', label: 'Jean Dupont (ABC Yachting)' },
    { value: 'Sophie Martin', label: 'Sophie Martin (Méditerranée Boats)' },
    { value: 'Philippe Leroy', label: 'Philippe Leroy (Yacht Services)' },
    { value: 'Maria Garcia', label: 'Maria Garcia (Navalia)' },
    { value: 'Lucie Bernard', label: 'Lucie Bernard (Boat Supply)' }
  ];

  const clientsOptions = [
    { value: '12345678900010', label: 'ABC Yachting' },
    { value: '23456789000020', label: 'Méditerranée Boats' },
    { value: '34567890000030', label: 'Yacht Services' },
    { value: '45678900000040', label: 'Navalia' },
    { value: '56789000000050', label: 'Boat Supply' }
  ];

  const delaiPaiementOptions = [
    { value: '15 jours', label: '15 jours' },
    { value: '30 jours', label: '30 jours' },
    { value: '45 jours', label: '45 jours' },
    { value: '60 jours', label: '60 jours' }
  ];

  const statutOptions = [
    { value: 'attente', label: 'En attente' },
    { value: 'converti', label: 'Converti' },
    { value: 'refusé', label: 'Refusé' }
  ];

  const articlesOptions = [
    { value: 'ART001', label: 'ART001 - Cordage nautique 12mm', prix: 12.50, conditionnement: 'Bobine', designation: 'Cordage nautique 12mm' },
    { value: 'ART002', label: 'ART002 - Petit matériel nautique - Kit débutant', prix: 49.95, conditionnement: 'Kit', designation: 'Petit matériel nautique - Kit débutant' },
    { value: 'ART003', label: 'ART003 - Caviar d\'Aquitaine', prix: 149.90, conditionnement: 'Pot', designation: 'Caviar d\'Aquitaine' },
    { value: 'ART004', label: 'ART004 - Champagne Brut', prix: 39.95, conditionnement: 'Bouteille', designation: 'Champagne Brut' },
    { value: 'ART005', label: 'ART005 - Gilet de sauvetage homologué', prix: 89.95, conditionnement: 'Carton', designation: 'Gilet de sauvetage homologué' }
  ];

  // Nouvel article temporaire pour le formulaire
  const [newDetail, setNewDetail] = useState({
    refArticle: '',
    designation: '',
    conditionnement: '',
    quantite: 1,
    prixVente: 0
  });

  // Colonnes pour le tableau principal
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Contact Client', accessor: 'contactClient' },
    { header: 'Date', accessor: 'dateDevis', render: (value) => new Date(value).toLocaleDateString('fr-FR') },
    { header: 'Total', accessor: 'total', render: (value) => `${value.toFixed(2)} €` },
    { 
      header: 'Statut', 
      accessor: 'statut', 
      render: (value) => {
        switch(value) {
          case 'attente':
            return <Badge variant="warning">En attente</Badge>;
          case 'converti':
            return <Badge variant="success">Converti</Badge>;
          case 'refusé':
            return <Badge variant="danger">Refusé</Badge>;
          default:
            return <Badge variant="default">{value}</Badge>;
        }
      }
    }
  ];

  // Gérer l'ajout de devis
  const handleAddClick = () => {
    setCurrentDevis(null);
    
    // Calculer la date de fin de validité par défaut (aujourd'hui + 30 jours)
    const today = new Date();
    const validUntil = new Date();
    validUntil.setDate(today.getDate() + 30);
    
    setFormData({
      contactClient: '',
      contactYPM: 'Admin YPM',
      siretClient: '',
      dateDevis: today.toISOString().split('T')[0],
      dateFinValidite: validUntil.toISOString().split('T')[0],
      delaiPaiement: '30 jours',
      remise: 0,
      statut: 'attente',
      details: []
    });
    
    setShowForm(true);
  };

  // Gérer l'édition de devis
  const handleEditClick = (devis) => {
    setCurrentDevis(devis);
    setFormData({
      contactClient: devis.contactClient,
      contactYPM: devis.contactYPM,
      siretClient: devis.siretClient,
      dateDevis: devis.dateDevis,
      dateFinValidite: devis.dateFinValidite,
      delaiPaiement: devis.delaiPaiement,
      dateValidation: devis.dateValidation,
      remise: devis.remise,
      statut: devis.statut,
      details: [...devis.details]
    });
    setShowForm(true);
  };

  // Gérer la suppression de devis
  const handleDeleteClick = (devis) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le devis #${devis.id} ?`)) {
      setDevis(devisList => devisList.filter(d => d.id !== devis.id));
    }
  };

  // Gérer les changements dans le formulaire principal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gérer les changements dans le formulaire de détail
  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'refArticle') {
      // Si l'article change, mettre à jour les infos associées
      const articleSelected = articlesOptions.find(art => art.value === value);
      
      if (articleSelected) {
        setNewDetail(prev => ({
          ...prev,
          refArticle: value,
          designation: articleSelected.designation,
          conditionnement: articleSelected.conditionnement,
          prixVente: articleSelected.prix
        }));
      } else {
        setNewDetail(prev => ({
          ...prev,
          refArticle: value
        }));
      }
    } else {
      setNewDetail(prev => ({
        ...prev,
        [name]: name === 'quantite' || name === 'prixVente' ? parseFloat(value) : value
      }));
    }
  };

  // Ajouter un détail au devis
  const handleAddDetail = () => {
    if (!newDetail.refArticle) {
      alert('Veuillez sélectionner un article');
      return;
    }
    
    const detailToAdd = {
      id: Date.now(), // ID temporaire
      ...newDetail
    };
    
    setFormData(prev => ({
      ...prev,
      details: [...prev.details, detailToAdd]
    }));
    
    // Réinitialiser le formulaire de détail
    setNewDetail({
      refArticle: '',
      designation: '',
      conditionnement: '',
      quantite: 1,
      prixVente: 0
    });
  };

  // Supprimer un détail
  const handleRemoveDetail = (detailId) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.filter(detail => detail.id !== detailId)
    }));
  };

  // Calculer le total du devis
  const calculateTotal = () => {
    let subtotal = formData.details.reduce((sum, detail) => 
      sum + (detail.quantite * detail.prixVente), 0);
    
    // Appliquer la remise
    return subtotal * (1 - (formData.remise / 100));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.details.length === 0) {
      alert('Veuillez ajouter au moins un article au devis');
      return;
    }
    
    const total = calculateTotal();
    
    if (currentDevis) {
      // Mise à jour d'un devis existant
      setDevis(prev => prev.map(d => 
        d.id === currentDevis.id 
          ? { ...formData, id: currentDevis.id, total } 
          : d
      ));
    } else {
      // Création d'un nouveau devis
      const newDevis = {
        ...formData,
        id: devis.length + 1,
        total
      };
      setDevis(prev => [...prev, newDevis]);
    }
    
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Devis</h1>
      </div>
      
      {showForm ? (
        <FormWrapper
          title={currentDevis ? `Modifier le devis #${currentDevis.id}` : "Créer un nouveau devis"}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SelectField
              label="Contact client"
              name="contactClient"
              value={formData.contactClient}
              onChange={handleInputChange}
              options={contactsClientOptions}
              required
            />
            <SelectField
              label="Client (SIRET)"
              name="siretClient"
              value={formData.siretClient}
              onChange={handleInputChange}
              options={clientsOptions}
              required
            />
            <InputField
              label="Date du devis"
              name="dateDevis"
              type="date"
              value={formData.dateDevis}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Date de fin de validité"
              name="dateFinValidite"
              type="date"
              value={formData.dateFinValidite}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Délai de paiement"
              name="delaiPaiement"
              value={formData.delaiPaiement}
              onChange={handleInputChange}
              options={delaiPaiementOptions}
              required
            />
            <InputField
              label="Remise globale (%)"
              name="remise"
              type="number"
              min="0"
              max="100"
              value={formData.remise}
              onChange={handleInputChange}
            />
            {currentDevis && (
              <SelectField
                label="Statut"
                name="statut"
                value={formData.statut}
                onChange={handleInputChange}
                options={statutOptions}
                required
              />
            )}
          </div>
          
          {/* Section des articles du devis */}
          <Card 
            title="Articles du devis" 
            className="mb-6"
          >
            <div className="space-y-4">
              {/* Liste des articles déjà ajoutés */}
              {formData.details.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Désignation</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conditionnement</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix unitaire</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.details.map((detail) => (
                      <tr key={detail.id}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{detail.refArticle}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{detail.designation}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{detail.conditionnement}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{detail.quantite}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{detail.prixVente.toFixed(2)} €</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{(detail.quantite * detail.prixVente).toFixed(2)} €</td>
                        <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            type="button"
                            onClick={() => handleRemoveDetail(detail.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan="5" className="px-4 py-2 whitespace-nowrap text-sm font-bold text-right">Total (avec remise de {formData.remise}%):</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900">{calculateTotal().toFixed(2)} €</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Aucun article ajouté au devis
                </div>
              )}
              
              {/* Formulaire d'ajout d'article */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Ajouter un article</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <SelectField
                      label="Article"
                      name="refArticle"
                      value={newDetail.refArticle}
                      onChange={handleDetailChange}
                      options={articlesOptions}
                    />
                  </div>
                  <div>
                    <InputField
                      label="Quantité"
                      name="quantite"
                      type="number"
                      min="1"
                      value={newDetail.quantite}
                      onChange={handleDetailChange}
                    />
                  </div>
                  <div>
                    <InputField
                      label="Prix unitaire (€)"
                      name="prixVente"
                      type="number"
                      step="0.01"
                      min="0"
                      value={newDetail.prixVente}
                      onChange={handleDetailChange}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full"
                      onClick={handleAddDetail}
                    >
                      <PlusIcon className="h-5 w-5 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </FormWrapper>
      ) : (
        <DataTable
          title="Liste des devis"
          columns={columns}
          data={devis}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          addButtonText="Créer un devis"
        />
      )}
    </div>
  );
};

export default Devis;