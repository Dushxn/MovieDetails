"use client"

import { motion } from "framer-motion"

const EpisodeCard = ({ episode }) => {
  // Default image if still_path is null
  const stillImage = episode.still_path
    ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
    : "https://via.placeholder.com/500x281?text=No+Image"

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-lg bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img
            src={stillImage || "/placeholder.svg"}
            alt={episode.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500x281?text=No+Image"
            }}
          />
        </div>

        <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-black text-xs font-semibold rounded-full">
          Episode {episode.episode_number}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-white">{episode.name}</h3>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-gray-300 text-sm">
            {episode.air_date && new Date(episode.air_date).toLocaleDateString()}
          </span>
          {episode.vote_average > 0 && (
            <span className="px-2 py-1 bg-gray-700 text-white text-xs font-semibold rounded-full flex items-center">
              ⭐ {episode.vote_average.toFixed(1)}
            </span>
          )}
        </div>
        {episode.overview && <p className="text-gray-300 text-sm mt-2 line-clamp-3">{episode.overview}</p>}
      </div>
    </motion.div>
  )
}

export default EpisodeCard
