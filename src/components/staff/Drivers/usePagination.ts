// app/components/Drivers/usePagination.tsx

import { useState } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const usePagination = ({ totalItems, itemsPerPage }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return [{ currentPage, totalPages }, nextPage, prevPage] as const;
};

export default usePagination;