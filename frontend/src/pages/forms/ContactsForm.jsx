import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSave, IoArrowBack } from 'react-icons/io5';
import Button from '../../components/common/Button';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';

const ContactsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    nom: '',
    poste: '',
    email: '',
    telephone: '',
    yacht: '',
    client: '',
    type: 'Client'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);
  const [yachts, setYachts] = useState([]);

  useEffect(() => {
    // Charger la liste des clients et yachts
    const fetchData = async () => {
      try {
        // Simulation d'appels API
        const clientsData = [
          { id: 1, nom: 'Yacht Azur' },
          { id: 2, nom: 'Médi Croisière' },
          { id: 3, nom: 'Sail & Sun' },
          { id: 4, nom: 'Mediterranean Yacht Club' },
          { id: 5, nom: 'Blue Ocean Charter' },
          { id: 6, nom: 'Méditerranée Provisions' }
        ];

        const yachtsData = [
          { id: 1, nom: 'Azur One', client: 1 },
          { id: 2, nom: 'Médi Dream', client: 2 },
          { id: 3, nom: 'Sun Runner', client: 3 },
          { id: 4, nom: 'Med Explorer', client: 4 },
          { id: 5, nom: 'Ocean Blue II', client: 5 }
        ];

        setClients(clientsData);
        setYachts(yachtsData);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
      }
    };

    fetchData();

    // Si on est en mode édition, charger les données du contact
    if (isEditMode) {
      setLoading(true);
      // Simulation d'un appel API
      setTimeout(() => {
        const contactData = {
          id: 1,
          nom: 'Jean Dupont',
          poste: 'Capitaine',
          email: 'jean.dupont@yachtazur.com',
          telephone: '+33 6 12 34 56 78',
          yacht: 1, // ID du yacht
          client: 1, // ID du client
          type: 'Client'
        };
        setFormData(contactData);
        setLoading(false);
      }, 500);
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si le client change, mettre à jour la liste des yachts disponibles
    if (name === 'client') {
      setFormData(prev => ({
        ...prev,
        client: value,
        yacht: '' // Réinitialiser le yacht
      }));
    }
    // Pour tous les autres champs
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Redirection après succès
      navigate('/contacts');
    } catch (err) {
      setError('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
      console.error('Erreur lors de la soumission du formulaire:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les yachts en fonction du client sélectionné
  const filteredYachts = formData.client 
    ? yachts.filter(yacht => yacht.client === parseInt(formData.client))
    : [];

  const typeOptions = [
    { value: 'Client', label: 'Client' },
    { value: 'Fournisseur', label: 'Fournisseur' },
    { value: 'Personnel', label: 'Personnel' }
  ];

  const posteOptions = [
    { value: 'Capitaine', label: 'Capitaine' },
    { value: 'Propriétaire', label: 'Propriétaire' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Chef', label: 'Chef' },
    { value: 'Directeur', label: 'Directeur' },
    { value: 'Autre', label: 'Autre' }
  ];

  if (loading && isEditMode) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-8 max-w-3xl mx-auto">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#292F6A]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-clash font-bold text-[#292F6A] tracking-[0.3em]">
          {isEditMode ? 'MODIFIER CONTACT' : 'NOUVEAU CONTACT'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/contacts')}
          className="flex items-center"
        >
          <IoArrowBack className="mr-2" /> Retour
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Nom"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Poste"
              id="poste"
              name="poste"
              value={formData.poste}
              onChange={handleChange}
              options={posteOptions}
              required
            />

            <InputField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <InputField
              label="Téléphone"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Type"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={typeOptions}
              required
            />

            <SelectField
              label="Client/Fournisseur"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              options={[
                { value: '', label: 'Sélectionner un client/fournisseur' },
                ...clients.map(client => ({ value: client.id, label: client.nom }))
              ]}
              required
            />

            {formData.type === 'Client' && (
              <SelectField
                label="Yacht"
                id="yacht"
                name="yacht"
                value={formData.yacht}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Sélectionner un yacht' },
                  ...filteredYachts.map(yacht => ({ value: yacht.id, label: yacht.nom }))
                ]}
                disabled={!formData.client}
              />
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              type="button" 
              variant="secondary" 
              className="mr-4"
              onClick={() => navigate('/contacts')}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              className="flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></div>
                  Enregistrement...
                </>
              ) : (
                <>
                  <IoSave className="mr-2" /> Enregistrer
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactsForm;