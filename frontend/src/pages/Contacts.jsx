import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoAdd, IoTrash, IoPencil, IoEye, IoMail, IoCall } from 'react-icons/io5';
import DataTable from '../components/tables/DataTable';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Contacts = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      nom: 'Jean Dupont',
      poste: 'Capitaine',
      email: 'jean.dupont@yachtazur.com',
      telephone: '+33 6 12 34 56 78',
      yacht: 'Azur One',
      client: 'Yacht Azur',
      type: 'Client',
    },
    {
      id: 2,
      nom: 'Marie Martin',
      poste: 'Propriétaire',
      email: 'marie.martin@medicrosiere.fr',
      telephone: '+33 6 23 45 67 89',
      yacht: 'Médi Dream',
      client: 'Médi Croisière',
      type: 'Client',
    },
    {
      id: 3,
      nom: 'Robert Mercier',
      poste: 'Directeur',
      email: 'contact@mediprovisions.com',
      telephone: '+33 4 93 12 34 56',
      yacht: null,
      client: 'Méditerranée Provisions',
      type: 'Fournisseur',
    },
    {
      id: 4,
      nom: 'Sophie Bernard',
      poste: 'Chef',
      email: 'sophie.bernard@gmail.com',
      telephone: '+33 6 45 67 89 01',
      yacht: 'Med Explorer',
      client: 'Mediterranean Yacht Club',
      type: 'Personnel',
    },
    {
      id: 5,
      nom: 'Pierre Lambert',
      poste: 'Manager',
      email: 'contact@sailsun.com',
      telephone: '+33 6 34 56 78 90',
      yacht: 'Sun Runner',
      client: 'Sail & Sun',
      type: 'Client',
    },
  ]);

  const handleDeleteContact = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  const handleSendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleCall = (telephone) => {
    window.location.href = `tel:${telephone}`;
  };

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Nom',
      accessor: 'nom',
    },
    {
      Header: 'Poste',
      accessor: 'poste',
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: ({ value }) => (
        <a href={`mailto:${value}`} className="text-[#292F6A] hover:underline">
          {value}
        </a>
      ),
    },
    {
      Header: 'Téléphone',
      accessor: 'telephone',
      Cell: ({ value }) => (
        <a href={`tel:${value}`} className="text-[#292F6A] hover:underline">
          {value}
        </a>
      ),
    },
    {
      Header: 'Client/Fournisseur',
      accessor: 'client',
    },
    {
      Header: 'Yacht',
      accessor: 'yacht',
      Cell: ({ value }) => value || '-',
    },
    {
      Header: 'Type',
      accessor: 'type',
      Cell: ({ value }) => {
        let badgeVariant = 'default';
        switch (value.toLowerCase()) {
          case 'client':
            badgeVariant = 'primary';
            break;
          case 'fournisseur':
            badgeVariant = 'info';
            break;
          case 'personnel':
            badgeVariant = 'success';
            break;
          default:
            badgeVariant = 'default';
        }
        return <Badge variant={badgeVariant}>{value}</Badge>;
      },
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      sortable: false,
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link to={`/contacts/${row.id}/view`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoEye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/contacts/${row.id}/edit`}>
            <Button variant="ghost" size="sm" className="p-1">
              <IoPencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 text-blue-600"
            onClick={() => handleSendEmail(row.email)}
          >
            <IoMail className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 text-green-600"
            onClick={() => handleCall(row.telephone)}
          >
            <IoCall className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 text-red-600 hover:text-red-800"
            onClick={() => handleDeleteContact(row.id)}
          >
            <IoTrash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-clash font-bold text-[#292F6A] tracking-[0.3em]">CONTACTS</h1>
        <Link to="/contacts/new">
          <Button variant="primary" className="flex items-center">
            <IoAdd className="h-5 w-5 mr-1" />
            Nouveau contact
          </Button>
        </Link>
      </div>

      <DataTable 
        columns={columns} 
        data={contacts} 
      />
    </div>
  );
};

export default Contacts;