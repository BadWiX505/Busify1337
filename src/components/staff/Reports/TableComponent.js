// TableComponent.js
import React, { useState } from 'react';
import TableRow from './TableRow';

const TableComponent = ({ reports, formatDate, formatTime }) => {
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedReports = reports.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '10px' }}>Date</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '80px' }}>
              
              <button onClick={toggleSortOrder}>
              Time
              {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '100px' }}>Warning</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '300px' }}>Comments</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '200px' }}>Reported By</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '200px' }}>Reported On</th>
          </tr>
        </thead>
        <tbody>
          {sortedReports.map(report => (
            <TableRow key={report.id} report={report} formatDate={formatDate} formatTime={formatTime} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
