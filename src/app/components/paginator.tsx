'use client';
import React from 'react';

type PaginationProps = {
  total: number;
  limit: number;
  skip: number;
  onPageChange: (newSkip: number) => void;
};

export default function Pagination({ total, limit, skip, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  const goToPage = (page: number) => {
    onPageChange((page - 1) * limit);
  };

  if (totalPages <= 1) return null;

  const renderPages = () => {
    const pages = [];
    const maxVisible = 5;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`px-3 py-1 rounded ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 4) ||
        (i === currentPage + 2 && currentPage < totalPages - 3)
      ) {
        pages.push(
          <span key={i} className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-2 mt-6 flex-wrap">
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
      >
        First
      </button>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>

      {renderPages()}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
}
