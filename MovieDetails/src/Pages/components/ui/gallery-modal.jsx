"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const GalleryModal = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        navigateImages(-1)
      } else if (e.key === "ArrowRight") {
        navigateImages(1)
      } else if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, images.length])

  const navigateImages = (direction) => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + direction
      if (newIndex < 0) newIndex = images.length - 1
      if (newIndex >= images.length) newIndex = 0
      return newIndex
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-50 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation buttons */}
        <button
          className="absolute left-4 z-50 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300"
          onClick={() => navigateImages(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="absolute right-4 z-50 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300"
          onClick={() => navigateImages(1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image container */}
        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={`https://image.tmdb.org/t/p/original${images[currentIndex].file_path}`}
              alt={`Gallery image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </div>

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-4 py-2 rounded-full text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default GalleryModal
