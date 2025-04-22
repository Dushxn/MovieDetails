"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const SeasonCard = ({ tvId, season }) => {
  // Default image if poster_path is null
  const posterImage = season.poster_path
    ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image"

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
      <Link to={`/tv/${tvId}/season/${season.season_number}`}>
        <div className="relative">
          <div className="aspect-[2/3] overflow-hidden">
            <img
              src={posterImage || "/placeholder.svg"}
              alt={season.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x450?text=No+Image"
              }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-white">{season.name}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-semibold rounded-full">
              {season.episode_count} Episodes
            </span>
            {season.air_date && (
              <span className="text-gray-300 text-sm">{new Date(season.air_date).getFullYear()}</span>
            )}
          </div>
          {season.overview && <p className="text-gray-300 text-sm mt-2 line-clamp-2">{season.overview}</p>}
        </div>
      </Link>
    </motion.div>
  )
}

export default SeasonCard
