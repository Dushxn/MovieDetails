"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useState } from "react"

const CastCard = ({ id, image, name, character, knownFor }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Default image if profile_path is null
  const profileImage = image
    ? `https://image.tmdb.org/t/p/w500${image}`
    : "https://via.placeholder.com/300x450?text=No+Image"

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/person/${id}`}>
        <div className="relative">
          <motion.div
            className="aspect-[2/3] overflow-hidden"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={profileImage || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x450?text=No+Image"
              }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0"
            animate={{ opacity: isHovered ? 0.7 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{name}</h3>
          {character && <p className="text-gray-600 dark:text-gray-300 text-sm">{character}</p>}
          {knownFor && <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Known for: {knownFor}</p>}
        </div>
      </Link>
    </motion.div>
  )
}

export default CastCard
