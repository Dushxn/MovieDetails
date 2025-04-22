"use client"

import { motion } from "framer-motion"

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <motion.div
        className="w-16 h-16 border-4 border-gray-300 border-t-yellow-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}

export default LoadingSpinner
