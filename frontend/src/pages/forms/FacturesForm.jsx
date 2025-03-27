import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSave, IoArrowBack } from 'react-icons/io5';
import Button from '../../components/common/Button';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';

const FacturesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    commande: '',
    client: '',
    date: new Date().toISOString().split('T')[0],
    montant: '',
    statut: 'En attente',
    date_paiement: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Charger la liste des commandes et clients
    const fetchData = async () => {
      try {
        // Simulation d'appels API
        const commandesData = [
          { id: 'CMD-2023-001', client: 'Yacht Azur', montant: 2850.75 },
          { id: 'CMD-2023-002', client: 'Médi Croisière', montant: 1950.25 },
          { id: 'CMD-2023-003', client: 'Sail & Sun', montant: 3420.90 },
          { id: 'CMD-2023-004', client: 'Mediterranean Yacht Club', montant: 5860.50 },
          { id: 'CMD-2023-005', client: 'Blue Ocean Charter', montant: 2120.30 }
        ];

        const clientsData = [
          { id: 1, nom: 'Yacht Azur' },
          { id: 2, nom: 'Médi Croisière' },
          { id: 3, nom: 'Sail & Sun' },
          { id: 4, nom: 'Mediterranean Yacht Club' },
          { id: 5, nom: 'Blue Ocean Charter' }
        ];

        setCommandes(commandesData);
        setClients(clientsData);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
      }
    };

    fetchData();

    // Si on est en mode édition, charger les données de la facture
    if (isEditMode) {
      setLoading(true);
      // Simulation d'un appel API
      setTimeout(() => {
        const factureData = {
          id: 'FAC-2023-001',
          commande: 'CMD-2023-001',
          client: 1, // ID du client
          date: '2023-03-17',
          montant: 2850.75,
          statut: 'Payée',
          date_paiement: '2023-03-20'
        };
        setFormData(factureData);
        setLoading(false);
      }, 500);
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si la commande change, mettre à jour le client et le montant
    if (name === 'commande') {
      const selectedCommande = commandes.find(cmd => cmd.id === value);
      if (selectedCommande) {
        const clientId = clients.find(c => c.nom === selectedCommande.client)?.id;
        setFormData(prev => ({
          ...prev,
          commande: value,
          client: clientId || '',
          montant: selectedCommande.montant
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
      navigate('/factures');
    } catch (err) {
      setError('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
      console.error('Erreur lors de la soumission du formulaire:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const statusOptions = [
    { value: 'En attente', label: 'En attente' },
    { value: 'Payée', label: 'Payée' },
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
          {isEditMode ? 'MODIFIER FACTURE' : 'NOUVELLE FACTURE'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/factures')}
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
              label="Date"
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <div className="flex flex-col">
              <label htmlFor="montant" className="block text-sm font-clash font-medium text-gray-700 mb-1">Montant</label>
              <div className="text-lg font-clash font-medium text-gray-900 py-2">
                {formatCurrency(formData.montant)}
              </div>
            </div>

            <SelectField
              label="Statut"
              id="statut"
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              options={statusOptions}
            />

            <InputField
              label="Date de paiement"
              id="date_paiement"
              name="date_paiement"
              type="date"
              value={formData.date_paiement}
              onChange={handleChange}
              disabled={formData.statut !== 'Payée'}
              required={formData.statut === 'Payée'}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              type="button" 
              variant="secondary" 
              className="mr-4"
              onClick={() => navigate('/factures')}
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

export default FacturesForm;