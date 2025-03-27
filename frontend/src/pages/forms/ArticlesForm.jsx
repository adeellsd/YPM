import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSave, IoArrowBack } from 'react-icons/io5';
import Button from '../../components/common/Button';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';

const ArticlesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    id: '',
    nom: '',
    categorie: '',
    prix: '',
    unite: '',
    fournisseur: '',
    stock: '',
    statut: 'En stock'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fournisseurs, setFournisseurs] = useState([]);

  useEffect(() => {
    // Charger la liste des fournisseurs
    const fetchFournisseurs = async () => {
      try {
        // Simulation d'un appel API
        const fournsData = [
          { id: 1, nom: 'Méditerranée Provisions' },
          { id: 2, nom: 'Marine Supplies Co.' },
          { id: 3, nom: 'Côte d\'Azur Boissons' },
          { id: 4, nom: 'Provence Gourmet' },
          { id: 5, nom: 'Riviera Yacht Services' }
        ];
        setFournisseurs(fournsData);
      } catch (err) {
        console.error('Erreur lors du chargement des fournisseurs:', err);
      }
    };

    fetchFournisseurs();

    // Si on est en mode édition, charger les données de l'article
    if (isEditMode) {
      setLoading(true);
      // Simulation d'un appel API
      setTimeout(() => {
        // Ces données seraient normalement récupérées de votre API
        const articleData = {
          id: 'ART-001',
          nom: 'Champagne Dom Pérignon Vintage',
          categorie: 'Boissons',
          prix: 199.50,
          unite: 'Bouteille',
          fournisseur: 3, // ID du fournisseur
          stock: 24,
          statut: 'En stock'
        };
        setFormData(articleData);
        setLoading(false);
      }, 500);
    } else {
      // En mode création, générer un nouvel ID
      setFormData(prev => ({
        ...prev,
        id: `ART-${Math.floor(Math.random() * 900) + 100}` // Format ART-XXX
      }));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    // Accepter uniquement des nombres, y compris avec virgule/point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
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
      navigate('/articles');
    } catch (err) {
      setError('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
      console.error('Erreur lors de la soumission du formulaire :', err);
    } finally {
      setLoading(false);
    }
  };

  const categorieOptions = [
    { value: 'Boissons', label: 'Boissons' },
    { value: 'Alimentation', label: 'Alimentation' },
    { value: 'Équipement', label: 'Équipement' },
    { value: 'Services', label: 'Services' },
    { value: 'Autre', label: 'Autre' }
  ];

  const uniteOptions = [
    { value: 'Bouteille', label: 'Bouteille' },
    { value: 'kg', label: 'kg' },
    { value: 'g', label: 'g' },
    { value: 'Pièce', label: 'Pièce' },
    { value: 'Carton', label: 'Carton' },
    { value: 'Service', label: 'Service' }
  ];

  const statutOptions = [
    { value: 'En stock', label: 'En stock' },
    { value: 'Stock bas', label: 'Stock bas' },
    { value: 'Rupture', label: 'Rupture' }
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
          {isEditMode ? 'MODIFIER ARTICLE' : 'NOUVEL ARTICLE'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/articles')}
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
              label="Référence"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              disabled={isEditMode}
              required
            />

            <InputField
              label="Nom de l'article"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Catégorie"
              id="categorie"
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              options={categorieOptions}
              required
            />

            <InputField
              label="Prix"
              id="prix"
              name="prix"
              type="text"
              value={formData.prix}
              onChange={handleNumberChange}
              required
            />

            <SelectField
              label="Unité"
              id="unite"
              name="unite"
              value={formData.unite}
              onChange={handleChange}
              options={uniteOptions}
              required
            />

            <SelectField
              label="Fournisseur"
              id="fournisseur"
              name="fournisseur"
              value={formData.fournisseur}
              onChange={handleChange}
              options={fournisseurs.map(f => ({ value: f.id, label: f.nom }))}
              required
            />

            <InputField
              label="Stock"
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Statut"
              id="statut"
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              options={statutOptions}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              type="button" 
              variant="secondary" 
              className="mr-4"
              onClick={() => navigate('/articles')}
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

export default ArticlesForm;