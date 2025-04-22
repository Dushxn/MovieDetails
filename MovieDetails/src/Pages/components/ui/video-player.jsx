"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const VideoPlayer = ({ videoId, title = "Video" }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-xl">
      {!isPlaying ? (
        <motion.div
          className="relative w-full h-full cursor-pointer"
          onClick={() => setIsPlaying(true)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
          />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 md:h-10 md:w-10 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          </div>

          {/* Video title */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-white font-medium text-lg">{title}</h3>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

export default VideoPlayer
