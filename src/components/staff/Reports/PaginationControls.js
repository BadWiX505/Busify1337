// PaginationControls.js
import React from 'react';

const PaginationControls = ({ currentPage, totalPages, nextPage, prevPage }) => {
  return (
    <div className="flex justify-between mt-4">
      <div>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
      </div>
      <div>
        <button
          className={`mr-2 px-4 py-2 ${currentPage === 1 ? 'bg-gray-500 text-gray-300' : 'bg-black text-white'} rounded`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`ml-2 px-4 py-2 ${currentPage === totalPages ? 'bg-gray-500 text-gray-300' : 'bg-black text-white'} rounded`}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
