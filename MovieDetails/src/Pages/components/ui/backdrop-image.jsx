"use client"

import { motion } from "framer-motion"

const BackdropImage = ({ imagePath, children, opacity = 0.6, blur = 4 }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image with blur effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${imagePath})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: `brightness(${opacity}) blur(${blur}px)`,
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

      {/* Content */}
      <motion.div
        className="relative z-20 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default BackdropImage
