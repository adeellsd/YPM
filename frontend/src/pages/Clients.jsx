import React, { useState } from 'react';
import DataTable from '../components/tables/DataTable';
import FormWrapper from '../components/forms/FormWrapper';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';

const Clients = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [clients, setClients] = useState([
    { id: 1, raisonSociale: 'ABC Yachting', siret: '12345678900010', type: 'Yachting', adresse: '12 Quai du Port, Marseille', email: 'contact@abcyachting.com', telephone: '04 12 34 56 78', adresseLivraison: '12 Quai du Port, Marseille', delaiPaiement: '30 jours' },
    { id: 2, raisonSociale: 'Méditerranée Boats', siret: '23456789000020', type: 'Yachting', adresse: '5 Avenue de la Plage, Nice', email: 'info@medboats.com', telephone: '04 23 45 67 89', adresseLivraison: '5 Avenue de la Plage, Nice', delaiPaiement: '45 jours' },
    { id: 3, raisonSociale: 'Restaurant La Marina', siret: '34567890000030', type: 'Restauration', adresse: '18 Rue du Port, Cannes', email: 'contact@lamarina.com', telephone: '04 34 56 78 90', adresseLivraison: '18 Rue du Port, Cannes', delaiPaiement: '30 jours' },
    { id: 4, raisonSociale: 'Industrie Navale Tech', siret: '45678900000040', type: 'Industrie', adresse: '42 Zone Industrielle, Toulon', email: 'contact@navaletech.com', telephone: '04 45 67 89 01', adresseLivraison: '42 Zone Industrielle, Toulon', delaiPaiement: '60 jours' },
    { id: 5, raisonSociale: 'Yacht Club Saint-Tropez', siret: '56789000000050', type: 'Yachting', adresse: '1 Port de Saint-Tropez, Saint-Tropez', email: 'info@ycst.com', telephone: '04 56 78 90 12', adresseLivraison: '1 Port de Saint-Tropez, Saint-Tropez', delaiPaiement: '30 jours' },
  ]);

  // Formulaire
  const [formData, setFormData] = useState({
    raisonSociale: '',
    siret: '',
    type: '',
    adresse: '',
    email: '',
    telephone: '',
    adresseLivraison: '',
    delaiPaiement: ''
  });

  // Options pour le type de client
  const typeOptions = [
    { value: 'Yachting', label: 'Yachting' },
    { value: 'Restauration', label: 'Restauration' },
    { value: 'Industrie', label: 'Industrie' }
  ];

  // Options pour le délai de paiement
  const delaiOptions = [
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
    { header: 'Téléphone', accessor: 'telephone' }
  ];

  // Gérer l'ouverture du formulaire d'ajout
  const handleAddClick = () => {
    setCurrentClient(null);
    setFormData({
      raisonSociale: '',
      siret: '',
      type: '',
      adresse: '',
      email: '',
      telephone: '',
      adresseLivraison: '',
      delaiPaiement: ''
    });
    setShowForm(true);
  };

  // Gérer l'ouverture du formulaire de modification
  const handleEditClick = (client) => {
    setCurrentClient(client);
    setFormData({
      raisonSociale: client.raisonSociale,
      siret: client.siret,
      type: client.type,
      adresse: client.adresse,
      email: client.email,
      telephone: client.telephone,
      adresseLivraison: client.adresseLivraison,
      delaiPaiement: client.delaiPaiement
    });
    setShowForm(true);
  };

  // Gérer la suppression
  const handleDeleteClick = (client) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le client ${client.raisonSociale} ?`)) {
      setClients(clients.filter(c => c.id !== client.id));
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
    
    if (currentClient) {
      // Mise à jour d'un client existant
      setClients(clients.map(client => 
        client.id === currentClient.id ? { ...client, ...formData } : client
      ));
    } else {
      // Ajout d'un nouveau client
      const newClient = {
        id: clients.length + 1,
        ...formData
      };
      setClients([...clients, newClient]);
    }
    
    // Fermer le formulaire
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Clients</h1>
      </div>
      
      {showForm ? (
        <FormWrapper
          title={currentClient ? "Modifier le client" : "Ajouter un client"}
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
              label="Type de client"
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
            <InputField
              label="Adresse de livraison"
              name="adresseLivraison"
              value={formData.adresseLivraison}
              onChange={handleInputChange}
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
          </div>
        </FormWrapper>
      ) : (
        <DataTable
          title="Liste des clients"
          columns={columns}
          data={clients}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          addButtonText="Ajouter un client"
        />
      )}
    </div>
  );
};

export default Clients;