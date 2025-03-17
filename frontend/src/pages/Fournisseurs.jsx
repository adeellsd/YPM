import React, { useState } from 'react';
import DataTable from '../components/tables/DataTable';
import FormWrapper from '../components/forms/FormWrapper';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';

const Fournisseurs = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentFournisseur, setCurrentFournisseur] = useState(null);
  const [fournisseurs, setFournisseurs] = useState([
    { id: 1, raisonSociale: 'Marine Supply Co.', siret: '12345678900011', type: 'revente', adresse: '15 Quai des Docks, Marseille', email: 'contact@marinesupply.com', telephone: '04 91 11 22 33', incoterm: 'EXW', joursCommande: 'Lundi, Mercredi', joursLivraison: 'Mardi, Jeudi', franco: '500€', delaiPaiement: '30 jours', delaiLivraison: '3 jours', montantMinimum: '200€' },
    { id: 2, raisonSociale: 'Yacht Equipment Ltd', siret: '23456789000021', type: 'revente', adresse: '8 Avenue Maritime, Nice', email: 'sales@yachtequipment.com', telephone: '04 93 22 33 44', incoterm: 'FOB', joursCommande: 'Mardi, Jeudi', joursLivraison: 'Mercredi, Vendredi', franco: '1000€', delaiPaiement: '45 jours', delaiLivraison: '5 jours', montantMinimum: '300€' },
    { id: 3, raisonSociale: 'Express Shipping', siret: '34567890000031', type: 'logistique', adresse: '42 Route du Port, Cannes', email: 'info@expressshipping.com', telephone: '04 92 33 44 55', incoterm: 'DAP', joursCommande: 'Lundi-Vendredi', joursLivraison: 'Lundi-Vendredi', franco: '0€', delaiPaiement: '30 jours', delaiLivraison: '1 jour', montantMinimum: '0€' },
    { id: 4, raisonSociale: 'Office Supplies', siret: '45678900000041', type: 'frais généraux', adresse: '78 Rue Commerciale, Toulon', email: 'orders@officesupplies.com', telephone: '04 94 44 55 66', incoterm: 'DDP', joursCommande: 'Tous les jours', joursLivraison: 'Sous 48h', franco: '100€', delaiPaiement: '15 jours', delaiLivraison: '2 jours', montantMinimum: '50€' },
    { id: 5, raisonSociale: 'Boat Parts Wholesale', siret: '56789000000051', type: 'revente', adresse: '25 Zone Industrielle, Montpellier', email: 'wholesale@boatparts.com', telephone: '04 67 55 66 77', incoterm: 'CIF', joursCommande: 'Lundi, Mercredi, Vendredi', joursLivraison: 'Mardi, Jeudi, Samedi', franco: '750€', delaiPaiement: '60 jours', delaiLivraison: '4 jours', montantMinimum: '250€' },
  ]);

  // Formulaire
  const [formData, setFormData] = useState({
    raisonSociale: '',
    siret: '',
    type: '',
    adresse: '',
    email: '',
    telephone: '',
    incoterm: '',
    joursCommande: '',
    joursLivraison: '',
    franco: '',
    delaiPaiement: '',
    delaiLivraison: '',
    montantMinimum: ''
  });

  // Options pour le type de fournisseur
  const typeOptions = [
    { value: 'revente', label: 'Revente' },
    { value: 'logistique', label: 'Logistique' },
    { value: 'frais généraux', label: 'Frais généraux' }
  ];

  // Options pour l'incoterm
  const incotermOptions = [
    { value: 'EXW', label: 'EXW - Ex Works' },
    { value: 'FOB', label: 'FOB - Free On Board' },
    { value: 'CIF', label: 'CIF - Cost, Insurance, Freight' },
    { value: 'DDP', label: 'DDP - Delivered Duty Paid' },
    { value: 'DAP', label: 'DAP - Delivered At Place' }
  ];

  // Options pour le délai de paiement
  const delaiOptions = [
    { value: '15 jours', label: '15 jours' },
    { value: '30 jours', label: '30 jours' },
    { value: '45 jours', label: '45 jours' },
    { value: '60 jours', label: '60 jours' },
    { value: '90 jours', label: '90 jours' }
  ];

  // Colonnes pour le tableau
  const columns = [
    { header: 'Raison Sociale', accessor: 'raisonSociale' },
    { header: 'SIRET', accessor: 'siret' },
    { header: 'Type', accessor: 'type' },
    { header: 'Email', accessor: 'email' },
    { header: 'Téléphone', accessor: 'telephone' },
    { header: 'Délai Livraison', accessor: 'delaiLivraison' }
  ];

  // Gérer l'ouverture du formulaire d'ajout
  const handleAddClick = () => {
    setCurrentFournisseur(null);
    setFormData({
      raisonSociale: '',
      siret: '',
      type: '',
      adresse: '',
      email: '',
      telephone: '',
      incoterm: '',
      joursCommande: '',
      joursLivraison: '',
      franco: '',
      delaiPaiement: '',
      delaiLivraison: '',
      montantMinimum: ''
    });
    setShowForm(true);
  };

  // Gérer l'ouverture du formulaire de modification
  const handleEditClick = (fournisseur) => {
    setCurrentFournisseur(fournisseur);
    setFormData({
      raisonSociale: fournisseur.raisonSociale,
      siret: fournisseur.siret,
      type: fournisseur.type,
      adresse: fournisseur.adresse,
      email: fournisseur.email,
      telephone: fournisseur.telephone,
      incoterm: fournisseur.incoterm,
      joursCommande: fournisseur.joursCommande,
      joursLivraison: fournisseur.joursLivraison,
      franco: fournisseur.franco,
      delaiPaiement: fournisseur.delaiPaiement,
      delaiLivraison: fournisseur.delaiLivraison,
      montantMinimum: fournisseur.montantMinimum
    });
    setShowForm(true);
  };

  // Gérer la suppression
  const handleDeleteClick = (fournisseur) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le fournisseur ${fournisseur.raisonSociale} ?`)) {
      setFournisseurs(fournisseurs.filter(f => f.id !== fournisseur.id));
    }
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentFournisseur) {
      // Mise à jour d'un fournisseur existant
      setFournisseurs(fournisseurs.map(fournisseur => 
        fournisseur.id === currentFournisseur.id ? { ...fournisseur, ...formData } : fournisseur
      ));
    } else {
      // Ajout d'un nouveau fournisseur
      const newFournisseur = {
        id: fournisseurs.length + 1,
        ...formData
      };
      setFournisseurs([...fournisseurs, newFournisseur]);
    }
    
    // Fermer le formulaire
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Fournisseurs</h1>
      </div>
      
      {showForm ? (
        <FormWrapper
          title={currentFournisseur ? "Modifier le fournisseur" : "Ajouter un fournisseur"}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Raison Sociale"
              name="raisonSociale"
              value={formData.raisonSociale}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="SIRET"
              name="siret"
              value={formData.siret}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Type de fournisseur"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              options={typeOptions}
              required
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Téléphone"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Adresse"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Incoterm"
              name="incoterm"
              value={formData.incoterm}
              onChange={handleInputChange}
              options={incotermOptions}
              required
            />
            <InputField
              label="Jours de commande"
              name="joursCommande"
              value={formData.joursCommande}
              onChange={handleInputChange}
              placeholder="ex: Lundi, Mercredi"
              required
            />
            <InputField
              label="Jours de livraison"
              name="joursLivraison"
              value={formData.joursLivraison}
              onChange={handleInputChange}
              placeholder="ex: Mardi, Jeudi"
              required
            />
            <InputField
              label="Franco (€)"
              name="franco"
              value={formData.franco}
              onChange={handleInputChange}
              placeholder="ex: 500€"
              required
            />
            <SelectField
              label="Délai de paiement"
              name="delaiPaiement"
              value={formData.delaiPaiement}
              onChange={handleInputChange}
              options={delaiOptions}
              required
            />
            <InputField
              label="Délai de livraison"
              name="delaiLivraison"
              value={formData.delaiLivraison}
              onChange={handleInputChange}
              placeholder="ex: 3 jours"
              required
            />
            <InputField
              label="Montant minimum de commande (€)"
              name="montantMinimum"
              value={formData.montantMinimum}
              onChange={handleInputChange}
              placeholder="ex: 200€"
              required
            />
          </div>
        </FormWrapper>
      ) : (
        <DataTable
          title="Liste des fournisseurs"
          columns={columns}
          data={fournisseurs}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          addButtonText="Ajouter un fournisseur"
        />
      )}
    </div>
  );
};

export default Fournisseurs;