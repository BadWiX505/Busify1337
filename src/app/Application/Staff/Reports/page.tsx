"use client"

import React, { useState, useEffect } from 'react';
import TableComponent from '@/components/Staff/Reports/TableComponent';
import PaginationControls from '@/components/Staff/Reports/PaginationControls';
import usePagination from '@/components/Staff/Reports/usePagination';
import { formatDate, formatTime } from '@/components/Staff/Reports/utils';

export default function Component() {
  const [reports, setReports] = useState([]);
  const [{ currentPage, totalPages }, nextPage, prevPage] = usePagination({
    totalItems: reports.length,
    itemsPerPage: 5,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/Staff/Reports/getReports');
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        console.error('Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * 5;
  const paginatedReports = reports.slice(startIndex, startIndex + 5);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
        <img 
          src="https://gifdb.com/images/high/funny-loading-vegetable-vm0664kd44rc3jk2.webp" 
          alt="Loading" 
          style={{ width: '200px', height: '200px' }} 
        />
      </div>
      
      
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Driver Warning</h1>
          <TableComponent reports={paginatedReports} formatDate={formatDate} formatTime={formatTime} />
          <PaginationControls currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />
        </div>
      )}
    </div>
  );
}
