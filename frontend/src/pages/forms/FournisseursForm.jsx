import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSave, IoArrowBack } from 'react-icons/io5';
import Button from '../../components/common/Button';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';

const FournisseursForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    nom: '',
    contact: '',
    email: '',
    telephone: '',
    adresse: '',
    categorie: 'Alimentation',
    statut: 'Actif'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si on est en mode édition, charger les données du fournisseur
    if (isEditMode) {
      setLoading(true);
      // Simulation de récupération de données
      setTimeout(() => {
        // Ces données seraient normalement récupérées de votre API
        const fournisseurData = {
          nom: 'Méditerranée Provisions',
          contact: 'Robert Mercier',
          email: 'contact@mediprovisions.com',
          telephone: '+33 4 93 12 34 56',
          adresse: '23 Avenue du Port, 06600 Antibes',
          categorie: 'Alimentation',
          statut: 'Actif'
        };
        setFormData(fournisseurData);
        setLoading(false);
      }, 500);
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
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Redirection après succès
      navigate('/fournisseurs');
    } catch (err) {
      setError('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
      console.error('Erreur lors de la soumission du formulaire :', err);
    } finally {
      setLoading(false);
    }
  };

  const categorieOptions = [
    { value: 'Alimentation', label: 'Alimentation' },
    { value: 'Équipement', label: 'Équipement' },
    { value: 'Boissons', label: 'Boissons' },
    { value: 'Services', label: 'Services' },
    { value: 'Autre', label: 'Autre' }
  ];

  const statusOptions = [
    { value: 'Actif', label: 'Actif' },
    { value: 'Inactif', label: 'Inactif' }
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
          {isEditMode ? 'MODIFIER FOURNISSEUR' : 'NOUVEAU FOURNISSEUR'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/fournisseurs')}
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
              label="Nom du fournisseur"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />

            <InputField
              label="Personne de contact"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
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

            <InputField
              label="Adresse"
              id="adresse"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              className="md:col-span-2"
              required
            />

            <SelectField
              label="Catégorie"
              id="categorie"
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              options={categorieOptions}
            />

            <SelectField
              label="Statut"
              id="statut"
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              options={statusOptions}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              type="button" 
              variant="secondary" 
              className="mr-4"
              onClick={() => navigate('/fournisseurs')}
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

export default FournisseursForm;