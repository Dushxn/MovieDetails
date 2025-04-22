"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import CastCard from "../components/ui/cast-card"
import Pagination from "../components/ui/pagination"
import { SkeletonGrid } from "../components/ui/skeleton-loader"

const People = () => {
  const [people, setPeople] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchPeople = async (page) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=${page}`,
      )
      const json = await response.json()
      setPeople(json.results || [])
      setTotalPages(json.total_pages)
    } catch (error) {
      console.error("Error fetching popular people:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPeople(currentPage)
    // Scroll to top when page changes
    window.scrollTo(0, 0)
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Popular People
          </motion.h1>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore popular actors, directors, and other film industry professionals
          </motion.p>
        </div>

        {loading ? (
          <SkeletonGrid count={20} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {people.map((person) => (
              <CastCard
                key={person.id}
                id={person.id}
                image={person.profile_path}
                name={person.name}
                knownFor={person.known_for_department}
              />
            ))}
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </motion.div>
    </div>
  )
}

export default People
