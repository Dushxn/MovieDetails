"use client"

import { motion } from "framer-motion"

const RatingBadge = ({ rating, size = "medium" }) => {
  // Determine color based on rating
  const getColor = (rating) => {
    if (rating >= 8) return "bg-green-500"
    if (rating >= 6) return "bg-yellow-500"
    if (rating >= 4) return "bg-orange-500"
    return "bg-red-500"
  }

  // Size classes
  const sizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-12 h-12 text-sm",
    large: "w-16 h-16 text-base",
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} ${getColor(rating)} rounded-full flex items-center justify-center text-black font-bold shadow-lg`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      }}
      whileHover={{ scale: 1.1 }}
    >
      {Number(rating).toFixed(1)}
    </motion.div>
  )
}

export default RatingBadge
