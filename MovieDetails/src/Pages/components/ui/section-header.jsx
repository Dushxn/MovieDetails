"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const SectionHeader = ({ title, linkTo, linkText = "See more" }) => {
  return (
    <div className="flex justify-between items-center mb-6 px-4">
      <motion.h2
        className="text-2xl md:text-3xl font-bold relative text-gray-900 dark:text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
        <motion.div
          className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "50%" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.h2>

      {linkTo && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            to={linkTo}
            className="group flex items-center space-x-1 bg-gray-200 hover:bg-yellow-500 dark:bg-gray-800 dark:hover:bg-yellow-500 text-gray-800 hover:text-black dark:text-white dark:hover:text-black px-4 py-2 rounded-full transition-all duration-300"
          >
            <span>{linkText}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      )}
    </div>
  )
}

export default SectionHeader
