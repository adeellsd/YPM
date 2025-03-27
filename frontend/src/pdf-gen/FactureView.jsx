import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IoArrowBack, IoPrint, IoDownload } from 'react-icons/io5';
import Button from '../components/common/Button';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import FacturePDF from '../components/pdf/FacturePDF';

const FactureView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [facture, setFacture] = useState(null);
  const [client, setClient] = useState(null);
  const [articles, setArticles] = useState([]);
  const [showPDFPreview, setShowPDFPreview] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setFacture({
        id: 'FAC-2023-001',
        date: '2023-04-15',
        dateEcheance: '2023-05-15',
        modePaiement: 'Virement bancaire',
        totalHT: 1250,
        montantTVA: 250,
        totalTTC: 1500,
        statut: 'Payée'
      });
      
      setClient({
        id: 'CLI-001',
        nom: 'Yacht Azur',
        adresse: '10 Promenade des Anglais',
        codePostal: '06000',
        ville: 'Nice',
        telephone: '+33 6 12 34 56 78',
        email: 'contact@yacht-azur.com'
      });
      
      setArticles([
        { 
          description: 'Service de nettoyage', 
          quantite: 1, 
          prixUnitaire: 500, 
          tauxTVA: 20,
          total: 500 
        },
        { 
          description: 'Approvisionnement en vivres', 
          quantite: 1, 
          prixUnitaire: 750, 
          tauxTVA: 20,
          total: 750 
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <div className="p-6 flex justify-center items-center">Chargement...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/factures')}
            className="mr-4"
          >
            <IoArrowBack className="h-5 w-5 mr-1" />
            Retour
          </Button>
          <h1 className="text-2xl font-clash font-bold text-[#292F6A] tracking-[0.3em]">
            FACTURE #{facture.id}
          </h1>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="secondary"
            onClick={() => setShowPDFPreview(!showPDFPreview)}
            className="flex items-center"
          >
            <IoPrint className="h-5 w-5 mr-1" />
            {showPDFPreview ? 'Masquer l\'aperçu' : 'Aperçu PDF'}
          </Button>
          
          <PDFDownloadLink
            document={<FacturePDF facture={facture} client={client} articles={articles} />}
            fileName={`facture-${facture.id}.pdf`}
            className="inline-block"
          >
            {({ blob, url, loading, error }) => (
              <Button 
                variant="primary" 
                disabled={loading}
                className="flex items-center"
              >
                <IoDownload className="h-5 w-5 mr-1" />
                {loading ? 'Génération...' : 'Télécharger'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      {/* Aperçu PDF */}
      {showPDFPreview ? (
        <div className="w-full h-[800px] border border-gray-300 rounded-md mb-6">
          <PDFViewer width="100%" height="100%" className="rounded-md">
            <FacturePDF facture={facture} client={client} articles={articles} />
          </PDFViewer>
        </div>
      ) : (
        // Affichage des détails de la facture en format HTML
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Informations client</h3>
              <p className="font-medium">{client.nom}</p>
              <p>{client.adresse}</p>
              <p>{client.codePostal} {client.ville}</p>
              <p>Tél: {client.telephone}</p>
              <p>Email: {client.email}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Détails de la facture</h3>
              <p><span className="font-medium">Date d'émission:</span> {new Date(facture.date).toLocaleDateString('fr-FR')}</p>
              <p><span className="font-medium">Date d'échéance:</span> {new Date(facture.dateEcheance).toLocaleDateString('fr-FR')}</p>
              <p><span className="font-medium">Mode de paiement:</span> {facture.modePaiement}</p>
              <p><span className="font-medium">Statut:</span> {facture.statut}</p>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Articles</h3>
          <table className="min-w-full bg-white border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-right">Quantité</th>
                <th className="py-2 px-4 border-b text-right">Prix unitaire</th>
                <th className="py-2 px-4 border-b text-right">TVA</th>
                <th className="py-2 px-4 border-b text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4 border-b">{article.description}</td>
                  <td className="py-2 px-4 border-b text-right">{article.quantite}</td>
                  <td className="py-2 px-4 border-b text-right">{article.prixUnitaire.toFixed(2)} €</td>
                  <td className="py-2 px-4 border-b text-right">{article.tauxTVA}%</td>
                  <td className="py-2 px-4 border-b text-right">{(article.quantite * article.prixUnitaire).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex flex-col items-end">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span className="font-medium">Total HT:</span>
                <span>{facture.totalHT.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">TVA:</span>
                <span>{facture.montantTVA.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-lg">
                <span>Total TTC:</span>
                <span>{facture.totalTTC.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FactureView;