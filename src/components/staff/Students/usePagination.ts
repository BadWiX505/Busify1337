// usePagination.ts

import { useState } from 'react';

interface PaginationOptions {
  totalItems: number;
  itemsPerPage: number;
}

interface PaginationState {
  currentPage: number;
  totalPages: number;
}

const usePagination = ({ totalItems, itemsPerPage }: PaginationOptions): [PaginationState, () => void, () => void] => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return [{ currentPage, totalPages }, nextPage, prevPage];
};

export default usePagination;
