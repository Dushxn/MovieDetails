"use client"

import { motion } from "framer-motion"
import AnimatedCard from "./animated-card"

const MediaGrid = ({ data, linkPrefix, type = "movie" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-700 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {data
        .filter((item) => item.poster_path)
        .map((item, index) => (
          <AnimatedCard
            key={item.id}
            id={item.id}
            image={item.poster_path}
            title={item.title || item.name}
            rating={item.vote_average}
            year={
              item.release_date
                ? new Date(item.release_date).getFullYear()
                : item.first_air_date
                  ? new Date(item.first_air_date).getFullYear()
                  : null
            }
            linkPrefix={linkPrefix}
            type={type}
          />
        ))}
    </motion.div>
  )
}

export default MediaGrid
