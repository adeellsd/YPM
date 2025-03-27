import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSave, IoArrowBack } from 'react-icons/io5';
import axios from 'axios';
import Button from '../../components/common/Button';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';

const ClientsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const isViewMode = window.location.pathname.includes('/view');

  const [formData, setFormData] = useState({
    nom: '',
    contact: '',
    email: '',
    telephone: '',
    yacht: '',
    statut: 'Actif'
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si on est en mode édition ou visualisation, charger les données du client
    if (isEditMode) {
      const fetchClient = async () => {
        try {
          setFetchLoading(true);
          const response = await axios.get(`http://10.27.20.200:3000/api/clients/${id}`);
          setFormData(response.data);
          setFetchLoading(false);
        } catch (err) {
          console.error('Erreur lors du chargement du client:', err);
          setError('Impossible de charger les données du client. Veuillez réessayer.');
          setFetchLoading(false);
        }
      };

      fetchClient();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode && !isViewMode) {
        // Mise à jour d'un client existant
        await axios.put(`http://10.27.20.200:3000/api/clients/${id}`, formData);
      } else if (!isViewMode) {
        // Création d'un nouveau client
        await axios.post('http://10.27.20.200:3000/api/clients', formData);
      }
      
      // Redirection après succès
      navigate('/clients');
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement:', err);
      setError('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'Actif', label: 'Actif' },
    { value: 'Inactif', label: 'Inactif' },
    { value: 'En attente', label: 'En attente' }
  ];

  if (fetchLoading) {
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
          {isViewMode ? 'DÉTAILS CLIENT' : isEditMode ? 'MODIFIER CLIENT' : 'NOUVEAU CLIENT'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/clients')}
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
              label="Nom du client"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              disabled={isViewMode}
            />

            <InputField
              label="Personne de contact"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              disabled={isViewMode}
            />

            <InputField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isViewMode}
            />

            <InputField
              label="Téléphone"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              disabled={isViewMode}
            />

            <InputField
              label="Yacht"
              id="yacht"
              name="yacht"
              value={formData.yacht}
              onChange={handleChange}
              disabled={isViewMode}
            />

            <SelectField
              label="Statut"
              id="statut"
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              options={statusOptions}
              disabled={isViewMode}
            />
          </div>

          {!isViewMode && (
            <div className="mt-8 flex justify-end">
              <Button 
                type="button" 
                variant="secondary" 
                className="mr-4"
                onClick={() => navigate('/clients')}
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
          )}
        </form>
      </div>
    </div>
  );
};

export default ClientsForm;