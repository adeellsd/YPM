import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp, IoSearch } from 'react-icons/io5';

const DataTable = ({
  columns = [],
  data = [],
  onRowClick,
  searchable = true,
  pagination = true,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // Gestion du tri
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filtrage des données
  const filteredData = data.filter((row) => {
    if (!searchTerm) return true;
    
    return columns.some((column) => {
      const value = row[column.accessor];
      if (value == null) return false;
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // Tri des données
  const sortedData = React.useMemo(() => {
    if (!sortField) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue == null) return sortDirection === 'asc' ? 1 : -1;
      if (bValue == null) return sortDirection === 'asc' ? -1 : 1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortDirection === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    });
  }, [filteredData, sortField, sortDirection]);

  // Pagination
  const paginatedData = pagination
    ? sortedData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    : sortedData;

  const pageCount = Math.ceil(sortedData.length / rowsPerPage);

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      {/* Barre de recherche */}
      {searchable && (
        <div className="p-4 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full font-clash font-light focus:outline-none focus:ring-2 focus:ring-[#292F6A]/20 focus:border-[#292F6A]"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
            />
          </div>
        </div>
      )}

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-clash font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable !== false ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => column.sortable !== false && handleSort(column.accessor)}
                >
                  <div className="flex items-center">
                    {column.Header}
                    {column.sortable !== false && (
                      <span className="ml-1">
                        {sortField === column.accessor ? (
                          sortDirection === 'asc' ? (
                            <IoChevronUp className="h-4 w-4" />
                          ) : (
                            <IoChevronDown className="h-4 w-4" />
                          )
                        ) : (
                          <span className="h-4 w-4 text-transparent">•</span>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${
                    onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
                  }`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => {
                    const cellValue = row[column.accessor];
                    
                    return (
                      <td
                        key={column.accessor}
                        className="px-6 py-4 whitespace-nowrap text-sm font-clash font-light text-gray-900"
                      >
                        {column.Cell ? column.Cell({ value: cellValue, row }) : cellValue}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm font-clash font-light text-gray-500"
                >
                  Aucune donnée disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-clash font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            <button
              onClick={() => setPage(Math.min(pageCount - 1, page + 1))}
              disabled={page >= pageCount - 1}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-clash font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 font-clash font-light">
                Affichage de{' '}
                <span className="font-medium">
                  {sortedData.length > 0 ? page * rowsPerPage + 1 : 0}
                </span>{' '}
                à{' '}
                <span className="font-medium">
                  {Math.min((page + 1) * rowsPerPage, sortedData.length)}
                </span>{' '}
                sur <span className="font-medium">{sortedData.length}</span> résultats
              </p>
            </div>
            <div className="flex items-center">
              <select
                className="mr-4 px-2 py-1 border border-gray-300 rounded-md text-sm font-clash font-light text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#292F6A]/20 focus:border-[#292F6A]"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setPage(0);
                }}
              >
                {rowsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} par page
                  </option>
                ))}
              </select>
              
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setPage(0)}
                  disabled={page === 0}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-clash font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Première</span>
                  <span>&laquo;</span>
                </button>
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-clash font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Précédent</span>
                  <span>&lsaquo;</span>
                </button>
                
                {[...Array(Math.min(5, pageCount))].map((_, i) => {
                  const pageIndex = page - 2 + i;
                  if (pageIndex >= 0 && pageIndex < pageCount) {
                    return (
                      <button
                        key={pageIndex}
                        onClick={() => setPage(pageIndex)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-clash ${
                          page === pageIndex
                            ? 'z-10 bg-[#292F6A] text-[#F6F3D0] border-[#292F6A] font-medium'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 font-light'
                        }`}
                      >
                        {pageIndex + 1}
                      </button>
                    );
                  }
                  return null;
                })}
                
                <button
                  onClick={() => setPage(Math.min(pageCount - 1, page + 1))}
                  disabled={page >= pageCount - 1}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-clash font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Suivant</span>
                  <span>&rsaquo;</span>
                </button>
                <button
                  onClick={() => setPage(pageCount - 1)}
                  disabled={page >= pageCount - 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-clash font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Dernière</span>
                  <span>&raquo;</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;