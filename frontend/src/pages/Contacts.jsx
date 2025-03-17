import React, { useState } from 'react';
import DataTable from '../components/tables/DataTable';
import Button from '../components/common/Button';
import FormWrapper from '../components/forms/FormWrapper';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';

const Contacts = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [contacts, setContacts] = useState([
    { id: 1, nom: 'Dupont', prenom: 'Jean', genre: 'homme', email: 'jean.dupont@example.com', telephone: '06 12 34 56 78', societe: 'ABC Yachting', role: 'Directeur' },
    { id: 2, nom: 'Martin', prenom: 'Sophie', genre: 'femme', email: 'sophie.martin@example.com', telephone: '07 23 45 67 89', societe: 'Méditerranée Boats', role: 'Responsable Achats' },
    { id: 3, nom: 'Leroy', prenom: 'Philippe', genre: 'homme', email: 'philippe.leroy@example.com', telephone: '06 34 56 78 90', societe: 'Yacht Services', role: 'Commercial' },
    { id: 4, nom: 'Garcia', prenom: 'Maria', genre: 'femme', email: 'maria.garcia@example.com', telephone: '07 45 67 89 01', societe: 'Navalia', role: 'Directrice' },
    { id: 5, nom: 'Bernard', prenom: 'Lucie', genre: 'femme', email: 'lucie.bernard@example.com', telephone: '06 56 78 90 12', societe: 'Boat Supply', role: 'Assistante' },
  ]);

  // Formulaire
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    genre: '',
    email: '',
    telephone: '',
    societe: '',
    role: '',
    adresse: ''
  });

  // Options pour le genre
  const genreOptions = [
    { value: 'homme', label: 'Homme' },
    { value: 'femme', label: 'Femme' },
    { value: 'autre', label: 'Autre' }
  ];

  // Colonnes pour le tableau
  const columns = [
    { header: 'Nom', accessor: 'nom' },
    { header: 'Prénom', accessor: 'prenom' },
    { header: 'Email', accessor: 'email' },
    { header: 'Téléphone', accessor: 'telephone' },
    { header: 'Société', accessor: 'societe' },
    { header: 'Rôle', accessor: 'role' }
  ];

  // Gérer l'ouverture du formulaire d'ajout
  const handleAddClick = () => {
    setCurrentContact(null);
    setFormData({
      nom: '',
      prenom: '',
      genre: '',
      email: '',
      telephone: '',
      societe: '',
      role: '',
      adresse: ''
    });
    setShowForm(true);
  };

  // Gérer l'ouverture du formulaire de modification
  const handleEditClick = (contact) => {
    setCurrentContact(contact);
    setFormData({
      nom: contact.nom,
      prenom: contact.prenom,
      genre: contact.genre,
      email: contact.email,
      telephone: contact.telephone,
      societe: contact.societe,
      role: contact.role,
      adresse: contact.adresse || ''
    });
    setShowForm(true);
  };

  // Gérer la suppression
  const handleDeleteClick = (contact) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le contact ${contact.prenom} ${contact.nom} ?`)) {
      setContacts(contacts.filter(c => c.id !== contact.id));
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
    
    if (currentContact) {
      // Mise à jour d'un contact existant
      setContacts(contacts.map(contact => 
        contact.id === currentContact.id ? { ...contact, ...formData } : contact
      ));
    } else {
      // Ajout d'un nouveau contact
      const newContact = {
        id: contacts.length + 1,
        ...formData
      };
      setContacts([...contacts, newContact]);
    }
    
    // Fermer le formulaire
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Contacts</h1>
      </div>
      
      {showForm ? (
        <FormWrapper
          title={currentContact ? "Modifier le contact" : "Ajouter un contact"}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              options={genreOptions}
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
              label="Société"
              name="societe"
              value={formData.societe}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Rôle"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Adresse"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
            />
          </div>
        </FormWrapper>
      ) : (
        <DataTable
          title="Liste des contacts"
          columns={columns}
          data={contacts}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          addButtonText="Ajouter un contact"
        />
      )}
    </div>
  );
};

export default Contacts;