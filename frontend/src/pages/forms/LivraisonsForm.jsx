import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSave, IoArrowBack } from 'react-icons/io5';
import Button from '../../components/common/Button';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';

const LivraisonsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    commande: '',
    client: '',
    date: new Date().toISOString().split('T')[0],
    adresse: '',
    statut: 'Planifiée',
    livreur: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [clients, setClients] = useState([]);
  const [livreurs, setLivreurs] = useState([]);

  useEffect(() => {
    // Charger les données des commandes, clients et livreurs
    const fetchData = async () => {
      try {
        // Simulation d'appels API
        const commandesData = [
          { id: 'CMD-2023-001', client: 'Yacht Azur', adresse: 'Port de Saint-Tropez, Ponton B' },
          { id: 'CMD-2023-002', client: 'Médi Croisière', adresse: 'Port de Marseille, Quai 4' },
          { id: 'CMD-2023-003', client: 'Sail & Sun', adresse: 'Port de Nice, Ponton A' },
          { id: 'CMD-2023-004', client: 'Mediterranean Yacht Club', adresse: 'Port de Cannes, Quai des Milliardaires' },
          { id: 'CMD-2023-005', client: 'Blue Ocean Charter', adresse: 'Port Camille Rayon, Golfe Juan' }
        ];

        const clientsData = [
          { id: 1, nom: 'Yacht Azur' },
          { id: 2, nom: 'Médi Croisière' },
          { id: 3, nom: 'Sail & Sun' },
          { id: 4, nom: 'Mediterranean Yacht Club' },
          { id: 5, nom: 'Blue Ocean Charter' }
        ];

        const livreursData = [
          { id: 1, nom: 'Jean Dupont' },
          { id: 2, nom: 'Pierre Martin' },
          { id: 3, nom: 'Sophie Bernard' },
          { id: 4, nom: 'Marc Dubois' }
        ];

        setCommandes(commandesData);
        setClients(clientsData);
        setLivreurs(livreursData);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
      }
    };

    fetchData();

    // Si on est en mode édition, charger les données de la livraison
    if (isEditMode) {
      setLoading(true);
      // Simulation d'un appel API
      setTimeout(() => {
        const livraisonData = {
          id: 'LIV-2023-001',
          commande: 'CMD-2023-001',
          client: 1, // ID du client
          date: '2023-03-16',
          adresse: 'Port de Saint-Tropez, Ponton B',
          statut: 'Livrée',
          livreur: 1 // ID du livreur
        };
        setFormData(livraisonData);
        setLoading(false);
      }, 500);
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si la commande change, mettre à jour le client et l'adresse
    if (name === 'commande') {
      const selectedCommande = commandes.find(cmd => cmd.id === value);
      if (selectedCommande) {
        const clientId = clients.find(c => c.nom === selectedCommande.client)?.id;
        setFormData(prev => ({
          ...prev,
          commande: value,
          client: clientId || '',
          adresse: selectedCommande.adresse || ''
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          commande: value
        }));
      }
    } else {
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
      navigate('/livraisons');
    } catch (err) {
      setError('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
      console.error('Erreur lors de la soumission du formulaire:', err);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'Planifiée', label: 'Planifiée' },
    { value: 'En cours', label: 'En cours' },
    { value: 'Livrée', label: 'Livrée' },
    { value: 'Annulée', label: 'Annulée' }
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
          {isEditMode ? 'MODIFIER LIVRAISON' : 'NOUVELLE LIVRAISON'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/livraisons')}
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
            <SelectField
              label="Commande"
              id="commande"
              name="commande"
              value={formData.commande}
              onChange={handleChange}
              options={commandes.map(cmd => ({ value: cmd.id, label: `${cmd.id} - ${cmd.client}` }))}
              required
            />

            <SelectField
              label="Client"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              options={clients.map(client => ({ value: client.id, label: client.nom }))}
              disabled={true} // Le client est déterminé par la commande
              required
            />

            <InputField
              label="Date de livraison"
              id="date"
              name="date"
              type="date"
              value={formData.date}
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

            <InputField
              label="Adresse de livraison"
              id="adresse"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              className="md:col-span-2"
              required
            />

            <SelectField
              label="Livreur"
              id="livreur"
              name="livreur"
              value={formData.livreur}
              onChange={handleChange}
              options={[
                { value: '', label: 'Sélectionner un livreur' },
                ...livreurs.map(livreur => ({ value: livreur.id, label: livreur.nom }))
              ]}
              required={formData.statut !== 'Planifiée'}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              type="button" 
              variant="secondary" 
              className="mr-4"
              onClick={() => navigate('/livraisons')}
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

export default LivraisonsForm;