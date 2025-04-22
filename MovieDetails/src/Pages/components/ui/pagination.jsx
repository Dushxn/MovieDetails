"use client"

import { motion } from "framer-motion"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  // Calculate page numbers to show
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first page
      pages.push(1)

      // Calculate middle pages
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4)
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3)
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("...")
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("...")
      }

      // Always include last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <motion.div
      className="flex justify-center items-center space-x-2 my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg flex items-center space-x-1 ${
          currentPage === 1
            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-yellow-500 hover:text-black"
        } transition-all duration-300`}
        whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>Prev</span>
      </motion.button>

      <div className="hidden sm:flex space-x-2">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-700 dark:text-gray-300">
              ...
            </span>
          ) : (
            <motion.button
              key={`page-${page}`}
              onClick={() => typeof page === "number" && onPageChange(page)}
              className={`w-10 h-10 rounded-lg ${
                currentPage === page
                  ? "bg-yellow-500 text-black font-bold"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
              } transition-all duration-300`}
              whileHover={currentPage !== page ? { scale: 1.1 } : {}}
              whileTap={currentPage !== page ? { scale: 0.9 } : {}}
            >
              {page}
            </motion.button>
          ),
        )}
      </div>

      <div className="flex sm:hidden items-center px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-white">
        <span>
          {currentPage} of {totalPages}
        </span>
      </div>

      <motion.button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg flex items-center space-x-1 ${
          currentPage === totalPages
            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-yellow-500 hover:text-black"
        } transition-all duration-300`}
        whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
      >
        <span>Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>
    </motion.div>
  )
}

export default Pagination
