"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useState } from "react"

const AnimatedCard = ({ id, image, title, rating, year, linkPrefix = "/info/", type = "movie" }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative h-64 sm:h-80 md:h-96 w-40 sm:w-52 md:w-64 rounded-xl overflow-hidden shadow-lg mb-8 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`${linkPrefix}${id}`}>
        <div className="relative w-full h-full">
          <motion.img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w500${image}`}
            alt={title}
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

          {/* Content overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-4 text-white"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-bold text-lg md:text-xl mb-2 line-clamp-2">{title}</h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-semibold rounded-full flex items-center">
                  ⭐ {Number(rating).toFixed(1)}
                </span>

                {year && (
                  <span className="px-2 py-1 bg-gray-700 text-white text-xs font-semibold rounded-full">{year}</span>
                )}
              </div>

              <motion.div
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

export default AnimatedCard
