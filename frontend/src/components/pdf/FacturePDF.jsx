import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFViewer,
  PDFDownloadLink,
  Image
} from '@react-pdf/renderer';

// Définition des styles pour le document PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  logo: {
    width: 150,
    height: 60
  },
  companyInfo: {
    fontSize: 10,
    textAlign: 'right'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#292F6A'
  },
  section: {
    margin: 10,
    padding: 10
  },
  clientInfo: {
    marginBottom: 20
  },
  clientTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5
  },
  clientDetail: {
    fontSize: 10,
    marginBottom: 3
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 20
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  tableHeader: {
    backgroundColor: '#f2f2f2'
  },
  tableCell: {
    padding: 5,
    fontSize: 10
  },
  tableCol1: {
    width: '40%'
  },
  tableCol2: {
    width: '15%'
  },
  tableCol3: {
    width: '15%'
  },
  tableCol4: {
    width: '15%'
  },
  tableCol5: {
    width: '15%'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingRight: 10
  },
  totalAmount: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: 'grey'
  }
});

// Composant Document Facture
const FacturePDF = ({ facture, client, articles }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* En-tête */}
      <View style={styles.header}>
        <Image 
          style={styles.logo}
          src="/path/to/your/logo.png" // Chemin vers votre logo YPM
        />
        <View style={styles.companyInfo}>
          <Text>Yachting Pyrénées Méditerranée</Text>
          <Text>123 Avenue de la Mer</Text>
          <Text>06400 Cannes, France</Text>
          <Text>Tél: +33 4 XX XX XX XX</Text>
          <Text>Email: contact@ypm.fr</Text>
        </View>
      </View>

      {/* Titre du document */}
      <Text style={styles.title}>FACTURE #{facture.id}</Text>
      
      {/* Infos client et facture */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.clientInfo}>
          <Text style={styles.clientTitle}>Client:</Text>
          <Text style={styles.clientDetail}>{client.nom}</Text>
          <Text style={styles.clientDetail}>{client.adresse}</Text>
          <Text style={styles.clientDetail}>{client.codePostal} {client.ville}</Text>
          <Text style={styles.clientDetail}>Tél: {client.telephone}</Text>
        </View>
        
        <View style={styles.clientInfo}>
          <Text style={styles.clientTitle}>Détails:</Text>
          <Text style={styles.clientDetail}>Date: {new Date(facture.date).toLocaleDateString('fr-FR')}</Text>
          <Text style={styles.clientDetail}>Échéance: {new Date(facture.dateEcheance).toLocaleDateString('fr-FR')}</Text>
          <Text style={styles.clientDetail}>Mode de paiement: {facture.modePaiement}</Text>
        </View>
      </View>

      {/* Tableau des articles */}
      <View style={styles.table}>
        {/* En-tête du tableau */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCell, styles.tableCol1]}><Text>Description</Text></View>
          <View style={[styles.tableCell, styles.tableCol2]}><Text>Quantité</Text></View>
          <View style={[styles.tableCell, styles.tableCol3]}><Text>Prix unitaire</Text></View>
          <View style={[styles.tableCell, styles.tableCol4]}><Text>TVA</Text></View>
          <View style={[styles.tableCell, styles.tableCol5]}><Text>Total</Text></View>
        </View>
        
        {/* Lignes d'articles */}
        {articles.map((article, i) => (
          <View key={i} style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCol1]}><Text>{article.description}</Text></View>
            <View style={[styles.tableCell, styles.tableCol2]}><Text>{article.quantite}</Text></View>
            <View style={[styles.tableCell, styles.tableCol3]}><Text>{article.prixUnitaire.toFixed(2)} €</Text></View>
            <View style={[styles.tableCell, styles.tableCol4]}><Text>{article.tauxTVA}%</Text></View>
            <View style={[styles.tableCell, styles.tableCol5]}>
              <Text>{(article.quantite * article.prixUnitaire).toFixed(2)} €</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Totaux */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total HT:</Text>
        <Text style={styles.totalAmount}>{facture.totalHT.toFixed(2)} €</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>TVA:</Text>
        <Text style={styles.totalAmount}>{facture.montantTVA.toFixed(2)} €</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total TTC:</Text>
        <Text style={styles.totalAmount}>{facture.totalTTC.toFixed(2)} €</Text>
      </View>

      {/* Pied de page */}
      <View style={styles.footer}>
        <Text>Yachting Pyrénées Méditerranée - SIRET: XXXXXXXXXXXXXXX</Text>
        <Text>TVA Intracommunautaire: FRXXXXXXXXXX</Text>
      </View>
    </Page>
  </Document>
);

export default FacturePDF;