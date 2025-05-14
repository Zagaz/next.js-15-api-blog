'use client';
import React from 'react';

// Props expected by the Pagination component
type PaginationProps = {
  total: number; // total number of items (e.g., posts)
  limit: number; // number of items per page
  skip: number; // how many items to skip (used for calculating the current page)
  onPageChange: (newSkip: number) => void; // callback function when changing pages
};

// Pagination component
export default function Pagination({ total, limit, skip, onPageChange }: PaginationProps) {
  // Calculate the total number of pages (rounding up)
  const totalPages = Math.ceil(total / limit);

  // Determine the current page based on how many items have been skipped
  const currentPage = Math.floor(skip / limit) + 1;

  // Change to a specific page by calculating how many items to skip
  const goToPage = (page: number) => {
    onPageChange((page - 1) * limit);
  };

  // If there's only one page or no pages, don't render the pagination
  if (totalPages <= 1) return null;

  // This function generates the page buttons, including ellipsis (...) for skipped ranges
  const renderPages = () => {
    const pages = [];
    const maxVisible = 5; // Optional: you can use this to limit how many buttons to show

    for (let i = 1; i <= totalPages; i++) {
      // Always show the first and last pages
      // Show two pages before and after the current one
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        // Render a page button
        pages.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`px-3 py-1 rounded ${
              currentPage === i
                ? 'bg-blue-600 text-white' // Highlight the current page
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {i}
          </button>
        );
      } 
      // Render ellipsis (...) to represent a skipped block of pages
      else if (
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

  // Final render with navigation buttons and page numbers
  return (
    <div className="flex items-center gap-2 mt-6 flex-wrap m-4">
      {/* Go to first page */}
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
      >
        First
      </button>

      {/* Go to previous page */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>

      {/* Render dynamic page number buttons */}
      {renderPages()}

      {/* Go to next page */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>

      {/* Go to last page */}
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
