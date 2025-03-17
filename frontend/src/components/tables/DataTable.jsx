import React, { useState } from 'react';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';

const DataTable = ({ 
  columns, 
  data, 
  title,
  onAdd,
  onEdit,
  onDelete,
  onView,
  addButtonText = 'Ajouter'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrer les données en fonction du terme de recherche
  const filteredData = searchTerm
    ? data.filter(item => 
        columns.some(column => 
          String(item[column.accessor]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* En-tête du tableau */}
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        {title && <h2 className="text-lg font-medium text-gray-900">{title}</h2>}
        
        <div className="flex items-center">
          <div className="relative mr-2">
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          
          {onAdd && (
            <Button
              variant="primary"
              className="px-3 py-2"
              onClick={onAdd}
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              {addButtonText}
            </Button>
          )}
        </div>
      </div>
      
      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {onView && (
                      <button
                        type="button"
                        className="text-ypm-blue hover:text-ypm-blue/80 mr-3"
                        onClick={() => onView(row)}
                      >
                        <MagnifyingGlassIcon className="h-5 w-5" />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        type="button"
                        className="text-ypm-blue hover:text-ypm-blue/80 mr-3"
                        onClick={() => onEdit(row)}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-900"
                        onClick={() => onDelete(row)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length + 1} 
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Aucune donnée trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;