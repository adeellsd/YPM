import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSave, IoArrowBack, IoAdd, IoTrash } from 'react-icons/io5';
import Button from '../../components/common/Button';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';

const DevisForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    client: '',
    date: new Date().toISOString().split('T')[0],
    validite: '',
    montant: 0,
    statut: 'En attente',
    lignes: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Calculer la date de validité par défaut (1 mois après la date actuelle)
    const defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() + 1);
    
    setFormData(prev => ({
      ...prev,
      validite: defaultDate.toISOString().split('T')[0]
    }));

    // Charger la liste des clients et des articles
    const fetchData = async () => {
      try {
        // Simulation d'appels API
        const clientsData = [
          { id: 1, nom: 'Yacht Azur' },
          { id: 2, nom: 'Médi Croisière' },
          { id: 3, nom: 'Sail & Sun' },
          { id: 4, nom: 'Mediterranean Yacht Club' },
          { id: 5, nom: 'Blue Ocean Charter' }
        ];

        const articlesData = [
          { id: 'ART-001', nom: 'Champagne Dom Pérignon', prix: 199.50 },
          { id: 'ART-002', nom: 'Caviar Osciètre Royal', prix: 145.75 },
          { id: 'ART-003', nom: 'Homard Bleu de Bretagne', prix: 62.80 },
          { id: 'ART-004', nom: 'Eau Evian Premium', prix: 3.25 },
          { id: 'ART-005', nom: 'Truffe Noire du Périgord', prix: 85.00 }
        ];

        setClients(clientsData);
        setArticles(articlesData);
      } catch (err) {
        console.error('Erreur lors du chargement des données :', err);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
      }
    };

    fetchData();

    // Si on est en mode édition, charger les données du devis
    if (isEditMode) {
      setLoading(true);
      // Simulation d'un appel API
      setTimeout(() => {
        const devisData = {
          id: 'DEV-2023-001',
          client: 1, // ID du client
          date: '2023-03-10',
          validite: '2023-04-10',
          montant: 2850.75,
          statut: 'En attente',
          lignes: [
            { id: 1, article: 'ART-001', quantite: 3, prix_unitaire: 199.50, total: 598.50 },
            { id: 2, article: 'ART-002', quantite: 2, prix_unitaire: 145.75, total: 291.50 },
            { id: 3, article: 'ART-003', quantite: 5, prix_unitaire: 62.80, total: 314.00 }
          ]
        };
        setFormData(devisData);
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

  const handleLigneChange = (index, field, value) => {
    const updatedLignes = [...formData.lignes];
    
    if (field === 'article') {
      const article = articles.find(a => a.id === value);
      updatedLignes[index] = {
        ...updatedLignes[index],
        article: value,
        prix_unitaire: article ? article.prix : 0
      };
    } else {
      updatedLignes[index] = {
        ...updatedLignes[index],
        [field]: value
      };
    }

    // Recalculer le total de la ligne
    if (field === 'article' || field === 'quantite') {
      const quantite = field === 'quantite' ? parseFloat(value) || 0 : parseFloat(updatedLignes[index].quantite) || 0;
      const prix = updatedLignes[index].prix_unitaire || 0;
      updatedLignes[index].total = quantite * prix;
    }

    // Mettre à jour les lignes et recalculer le montant total
    setFormData(prev => {
      const newFormData = {
        ...prev,
        lignes: updatedLignes
      };

      // Calculer le montant total
      newFormData.montant = updatedLignes.reduce((total, ligne) => total + (ligne.total || 0), 0);

      return newFormData;
    });
  };

  const addLigne = () => {
    setFormData(prev => ({
      ...prev,
      lignes: [...prev.lignes, { article: '', quantite: 1, prix_unitaire: 0, total: 0 }]
    }));
  };

  const removeLigne = (index) => {
    const updatedLignes = formData.lignes.filter((_, i) => i !== index);
    
    setFormData(prev => {
      const newFormData = {
        ...prev,
        lignes: updatedLignes
      };

      // Recalculer le montant total
      newFormData.montant = updatedLignes.reduce((total, ligne) => total + (ligne.total || 0), 0);

      return newFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulation d'un appel API réussi
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Redirection après succès
      navigate('/devis');
    } catch (err) {
      setError('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
      console.error('Erreur lors de la soumission du formulaire :', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const statusOptions = [
    { value: 'En attente', label: 'En attente' },
    { value: 'Accepté', label: 'Accepté' },
    { value: 'Refusé', label: 'Refusé' }
  ];

  if (loading && isEditMode) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-8 max-w-4xl mx-auto">
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
          {isEditMode ? 'MODIFIER DEVIS' : 'NOUVEAU DEVIS'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/devis')}
          className="flex items-center"
        >
          <IoArrowBack className="mr-2" /> Retour
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <SelectField
              label="Client"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              options={clients.map(client => ({ value: client.id, label: client.nom }))}
              required
            />

            <InputField
              label="Date"
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <InputField
              label="Date de validité"
              id="validite"
              name="validite"
              type="date"
              value={formData.validite}
              onChange={handleChange}
              required
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

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-clash font-bold text-[#292F6A]">Articles</h3>
            <Button 
              type="button" 
              variant="primary" 
              size="sm" 
              onClick={addLigne}
              className="flex items-center"
            >
              <IoAdd className="mr-1" /> Ajouter article
            </Button>
          </div>
          
          <div className="mb-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">Article</th>
                  <th className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                  <th className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">Prix Unitaire</th>
                  <th className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.lignes.map((ligne, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <SelectField
                        id={`article-${index}`}
                        name={`article-${index}`}
                        value={ligne.article}
                        onChange={(e) => handleLigneChange(index, 'article', e.target.value)}
                        options={articles.map(article => ({ value: article.id, label: article.nom }))}
                        className="w-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <InputField
                        id={`quantite-${index}`}
                        name={`quantite-${index}`}
                        type="number"
                        min="1"
                        value={ligne.quantite}
                        onChange={(e) => handleLigneChange(index, 'quantite', e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-clash font-medium text-gray-900">
                        {formatCurrency(ligne.prix_unitaire || 0)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-clash font-medium text-gray-900">
                        {formatCurrency(ligne.total || 0)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => removeLigne(index)}
                      >
                        <IoTrash className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {formData.lignes.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      Aucun article ajouté. Cliquez sur "Ajouter article" pour commencer.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan="3" className="px-6 py-3 text-right font-clash font-bold text-gray-700">
                    Total du devis:
                  </td>
                  <td className="px-6 py-3 font-clash font-bold text-gray-900">
                    {formatCurrency(formData.montant)}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              type="button" 
              variant="secondary" 
              className="mr-4"
              onClick={() => navigate('/devis')}
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

export default DevisForm;