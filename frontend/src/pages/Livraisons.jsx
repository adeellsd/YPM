import React, { useState } from 'react';
import DataTable from '../components/tables/DataTable';
import FormWrapper from '../components/forms/FormWrapper';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';

const Livraisons = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentLivraison, setCurrentLivraison] = useState(null);
  
  // Données fictives pour les bons de livraison
  const [livraisons, setLivraisons] = useState([
    { 
      id: 1, 
      reference: 'BL-0501',
      contactClient: 'Jean Dupont', 
      contactYPM: 'Admin YPM',
      siretClient: '12345678900010',
      referenceBDC: 'BC-1001',
      dateLivraison: '2025-03-20',
      heureLivraison: '10:30',
      adresseLivraison: '12 Quai du Port, Marseille',
      statut: 'livré',
      details: [
        { id: 1, referenceBDC: 'BC-1001', refArticle: 'ART001', uniteConditionnement: 'Bobine', quantite: 50, reserves: false, commentairesReserves: '' },
        { id: 2, referenceBDC: 'BC-1001', refArticle: 'ART002', uniteConditionnement: 'Kit', quantite: 2, reserves: false, commentairesReserves: '' }
      ]
    },
    { 
      id: 2, 
      reference: 'BL-0502',
      contactClient: 'Sophie Martin', 
      contactYPM: 'Admin YPM',
      siretClient: '23456789000020',
      referenceBDC: 'BC-1002',
      dateLivraison: '2025-03-18',
      heureLivraison: '14:00',
      adresseLivraison: '5 Avenue de la Plage, Nice',
      statut: 'XDock',
      details: [
        { id: 3, referenceBDC: 'BC-1002', refArticle: 'ART003', uniteConditionnement: 'Pot', quantite: 5, reserves: true, commentairesReserves: 'Un pot endommagé' },
        { id: 4, referenceBDC: 'BC-1002', refArticle: 'ART004', uniteConditionnement: 'Bouteille', quantite: 24, reserves: false, commentairesReserves: '' },
        { id: 5, referenceBDC: 'BC-1002', refArticle: 'ART005', uniteConditionnement: 'Carton', quantite: 10, reserves: false, commentairesReserves: '' }
      ]
    },
    { 
      id: 3, 
      reference: 'BL-0503',
      contactClient: 'Philippe Leroy', 
      contactYPM: 'Admin YPM',
      siretClient: '34567890000030',
      referenceBDC: 'BC-1003',
      dateLivraison: '2025-03-22',
      heureLivraison: '09:15',
      adresseLivraison: '18 Rue du Port, Cannes',
      statut: 'édité',
      details: [
        { id: 6, referenceBDC: 'BC-1003', refArticle: 'ART002', uniteConditionnement: 'Kit', quantite: 5, reserves: false, commentairesReserves: '' },
        { id: 7, referenceBDC: 'BC-1003', refArticle: 'ART005', uniteConditionnement: 'Carton', quantite: 8, reserves: false, commentairesReserves: '' }
      ]
    }
  ]);

  // Données pour la création/édition
 // Données pour la création/édition
 const [formData, setFormData] = useState({
    reference: '',
    contactClient: '',
    contactYPM: 'Admin YPM',
    siretClient: '',
    referenceBDC: '',
    dateLivraison: '',
    heureLivraison: '',
    adresseLivraison: '',
    statut: 'édité',
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

  const commandesOptions = [
    { value: 'BC-1001', label: 'BC-1001 - ABC Yachting' },
    { value: 'BC-1002', label: 'BC-1002 - Méditerranée Boats' },
    { value: 'BC-1003', label: 'BC-1003 - Yacht Services' }
  ];

  const adressesLivraisonOptions = [
    { value: '12 Quai du Port, Marseille', label: '12 Quai du Port, Marseille' },
    { value: '5 Avenue de la Plage, Nice', label: '5 Avenue de la Plage, Nice' },
    { value: '18 Rue du Port, Cannes', label: '18 Rue du Port, Cannes' },
    { value: '42 Zone Industrielle, Toulon', label: '42 Zone Industrielle, Toulon' },
    { value: '1 Port de Saint-Tropez, Saint-Tropez', label: '1 Port de Saint-Tropez, Saint-Tropez' }
  ];

  const statutOptions = [
    { value: 'édité', label: 'Édité' },
    { value: 'XDock', label: 'XDock' },
    { value: 'livré', label: 'Livré' },
    { value: 'annulé', label: 'Annulé' }
  ];

  // Données des commandes pour auto-remplir les détails
  const commandesDetails = {
    'BC-1001': [
      { id: 1, refArticle: 'ART001', designation: 'Cordage nautique 12mm', uniteConditionnement: 'Bobine', quantite: 50 },
      { id: 2, refArticle: 'ART002', designation: 'Petit matériel nautique - Kit débutant', uniteConditionnement: 'Kit', quantite: 2 }
    ],
    'BC-1002': [
      { id: 3, refArticle: 'ART003', designation: 'Caviar d\'Aquitaine', uniteConditionnement: 'Pot', quantite: 5 },
      { id: 4, refArticle: 'ART004', designation: 'Champagne Brut', uniteConditionnement: 'Bouteille', quantite: 24 },
      { id: 5, refArticle: 'ART005', designation: 'Gilet de sauvetage homologué', uniteConditionnement: 'Carton', quantite: 10 }
    ],
    'BC-1003': [
      { id: 6, refArticle: 'ART002', designation: 'Petit matériel nautique - Kit débutant', uniteConditionnement: 'Kit', quantite: 5 },
      { id: 7, refArticle: 'ART005', designation: 'Gilet de sauvetage homologué', uniteConditionnement: 'Carton', quantite: 8 }
    ]
  };

  // Colonnes pour le tableau principal
  const columns = [
    { header: 'Référence', accessor: 'reference' },
    { header: 'Bon de commande', accessor: 'referenceBDC' },
    { header: 'Contact Client', accessor: 'contactClient' },
    { header: 'Date', accessor: 'dateLivraison', render: (value) => new Date(value).toLocaleDateString('fr-FR') },
    { header: 'Heure', accessor: 'heureLivraison' },
    { 
      header: 'Statut', 
      accessor: 'statut', 
      render: (value) => {
        switch(value) {
          case 'édité':
            return <Badge variant="default">Édité</Badge>;
          case 'XDock':
            return <Badge variant="warning">XDock</Badge>;
          case 'livré':
            return <Badge variant="success">Livré</Badge>;
          case 'annulé':
            return <Badge variant="danger">Annulé</Badge>;
          default:
            return <Badge variant="default">{value}</Badge>;
        }
      }
    }
  ];

  // Générer une référence BL unique
  const generateReference = () => {
    const lastRef = livraisons.length > 0 
      ? parseInt(livraisons[livraisons.length - 1].reference.split('-')[1]) 
      : 500;
    return `BL-${lastRef + 1}`;
  };

  // Gérer l'ajout de bon de livraison
  const handleAddClick = () => {
    setCurrentLivraison(null);
    
    const today = new Date();
    
    setFormData({
      reference: generateReference(),
      contactClient: '',
      contactYPM: 'Admin YPM',
      siretClient: '',
      referenceBDC: '',
      dateLivraison: today.toISOString().split('T')[0],
      heureLivraison: `${today.getHours()}:${today.getMinutes().toString().padStart(2, '0')}`,
      adresseLivraison: '',
      statut: 'édité',
      details: []
    });
    
    setShowForm(true);
  };

  // Gérer l'édition de bon de livraison
  const handleEditClick = (livraison) => {
    setCurrentLivraison(livraison);
    setFormData({
      reference: livraison.reference,
      contactClient: livraison.contactClient,
      contactYPM: livraison.contactYPM,
      siretClient: livraison.siretClient,
      referenceBDC: livraison.referenceBDC,
      dateLivraison: livraison.dateLivraison,
      heureLivraison: livraison.heureLivraison,
      adresseLivraison: livraison.adresseLivraison,
      statut: livraison.statut,
      details: [...livraison.details]
    });
    setShowForm(true);
  };

  // Gérer la suppression de bon de livraison
  const handleDeleteClick = (livraison) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le bon de livraison ${livraison.reference} ?`)) {
      setLivraisons(livraisonsList => livraisonsList.filter(l => l.id !== livraison.id));
    }
  };

  // Gérer les changements dans le formulaire principal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'referenceBDC' && value && commandesDetails[value]) {
      // Auto-remplir les détails de la commande
      const detailsFromCommande = commandesDetails[value].map(detail => ({
        ...detail,
        referenceBDC: value,
        reserves: false,
        commentairesReserves: ''
      }));
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        details: detailsFromCommande
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Gérer les changements de statut de réserve
  const handleReserveChange = (detailId, hasReserve, comment = '') => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.map(detail => 
        detail.id === detailId 
          ? { 
              ...detail, 
              reserves: hasReserve,
              commentairesReserves: hasReserve ? comment : ''
            } 
          : detail
      )
    }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.details.length === 0) {
      alert('Ce bon de livraison ne contient aucun article');
      return;
    }
    
    if (currentLivraison) {
      // Mise à jour d'un bon de livraison existant
      setLivraisons(prev => prev.map(l => 
        l.id === currentLivraison.id 
          ? { ...formData, id: currentLivraison.id } 
          : l
      ));
    } else {
      // Création d'un nouveau bon de livraison
      const newLivraison = {
        ...formData,
        id: livraisons.length + 1
      };
      setLivraisons(prev => [...prev, newLivraison]);
    }
    
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Bons de Livraison</h1>
      </div>
      
      {showForm ? (
        <FormWrapper
          title={currentLivraison ? `Modifier le bon de livraison ${currentLivraison.reference}` : "Créer un bon de livraison"}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <InputField
              label="Référence"
              name="reference"
              value={formData.reference}
              onChange={handleInputChange}
              disabled={true}
              required
            />
            <SelectField
              label="Bon de commande"
              name="referenceBDC"
              value={formData.referenceBDC}
              onChange={handleInputChange}
              options={commandesOptions}
              required
            />
            <SelectField
              label="Contact client"
              name="contactClient"
              value={formData.contactClient}
              onChange={handleInputChange}
              options={contactsClientOptions}
              required
            />
            <InputField
              label="Contact YPM"
              name="contactYPM"
              value={formData.contactYPM}
              onChange={handleInputChange}
              disabled={true}
              required
            />
            <InputField
              label="Date de livraison"
              name="dateLivraison"
              type="date"
              value={formData.dateLivraison}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Heure de livraison"
              name="heureLivraison"
              type="time"
              value={formData.heureLivraison}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Adresse de livraison"
              name="adresseLivraison"
              value={formData.adresseLivraison}
              onChange={handleInputChange}
              options={adressesLivraisonOptions}
              required
            />
            <SelectField
              label="Statut"
              name="statut"
              value={formData.statut}
              onChange={handleInputChange}
              options={statutOptions}
              required
            />
          </div>
          
          {/* Section des articles du bon de livraison */}
          <Card 
            title="Articles à livrer" 
            className="mb-6"
          >
            <div className="space-y-4">
              {/* Liste des articles */}
              {formData.details.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unité</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Réserves</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commentaires</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.details.map((detail) => (
                      <tr key={detail.id}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{detail.refArticle}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{detail.uniteConditionnement}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{detail.quantite}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={detail.reserves}
                              onChange={(e) => handleReserveChange(detail.id, e.target.checked)}
                              className="h-4 w-4 text-ypm-blue focus:ring-ypm-light border-gray-300 rounded"
                            />
                            <span className="ml-2">Oui</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {detail.reserves && (
                            <textarea
                              value={detail.commentairesReserves}
                              onChange={(e) => handleReserveChange(detail.id, true, e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              rows="2"
                              placeholder="Commentaires sur les réserves..."
                            ></textarea>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  {formData.referenceBDC 
                    ? "Aucun article trouvé pour ce bon de commande" 
                    : "Veuillez sélectionner un bon de commande pour charger les articles"}
                </div>
              )}
            </div>
          </Card>
        </FormWrapper>
      ) : (
        <DataTable
          title="Liste des bons de livraison"
          columns={columns}
          data={livraisons}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          addButtonText="Créer un bon de livraison"
        />
      )}
    </div>
  );
};

export default Livraisons;