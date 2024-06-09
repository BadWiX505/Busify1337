// usePagination.ts

import { useState } from 'react';

interface PaginationState {
  currentPage: number;
  totalPages: number;
}

export default function usePagination({ totalItems, itemsPerPage }: { totalItems: number; itemsPerPage: number }): [PaginationState, () => void, () => void] {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return [{ currentPage, totalPages }, nextPage, prevPage];
}
