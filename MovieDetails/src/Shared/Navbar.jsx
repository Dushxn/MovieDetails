"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FaSearch, FaBars, FaTimes, FaFilm, FaTv, FaHome, FaEnvelope } from "react-icons/fa"
import ThemeToggle from "../Pages/components/ui/theme-toggle"

const Navbar = () => {
  const [search, setSearch] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/search/${search}`)
      setSearch("")
      setIsMobileMenuOpen(false)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <motion.nav
        className={`fixed z-50 top-0 left-0 right-0 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-md py-2 shadow-md"
            : "bg-gradient-to-b from-gray-50/80 to-transparent dark:from-black/80 dark:to-transparent py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                className="bg-yellow-500 rounded-full p-2"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h-2v-2h2zm-2-2h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-4h2v-2h-2v2zm-4 0h2v-2H7v2zm0 4h2v-2H7v2z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">RetroDB</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 dark:text-white hover:text-yellow-500 transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/movies"
                className="text-gray-700 dark:text-white hover:text-yellow-500 transition-colors duration-300"
              >
                Movies
              </Link>
              <Link
                to="/tvshows"
                className="text-gray-700 dark:text-white hover:text-yellow-500 transition-colors duration-300"
              >
                TV Shows
              </Link>
              <Link
                to="/people"
                className="text-gray-700 dark:text-white hover:text-yellow-500 transition-colors duration-300"
              >
                People
              </Link>
              <Link
                to="/email"
                className="text-gray-700 dark:text-white hover:text-yellow-500 transition-colors duration-300"
              >
                Contact
              </Link>
            </div>

            {/* Search Bar and Theme Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <form onSubmit={handleSubmit} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search movies, TV shows..."
                    value={search}
                    onChange={handleSearch}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-64 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500"
                  >
                    <FaSearch />
                  </button>
                </div>
              </form>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <ThemeToggle />
              <button onClick={toggleMobileMenu} className="text-gray-700 dark:text-white focus:outline-none">
                {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 pt-20 px-4 md:hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-6">
              {/* Mobile Search */}
              <form onSubmit={handleSubmit} className="flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search movies, TV shows..."
                    value={search}
                    onChange={handleSearch}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500"
                  >
                    <FaSearch className="h-5 w-5" />
                  </button>
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <Link
                to="/"
                className="flex items-center space-x-3 text-gray-700 dark:text-white hover:text-yellow-500 py-3 border-b border-gray-200 dark:border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaHome className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                to="/movies"
                className="flex items-center space-x-3 text-gray-700 dark:text-white hover:text-yellow-500 py-3 border-b border-gray-200 dark:border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaFilm className="h-5 w-5" />
                <span>Movies</span>
              </Link>
              <Link
                to="/tvshows"
                className="flex items-center space-x-3 text-gray-700 dark:text-white hover:text-yellow-500 py-3 border-b border-gray-200 dark:border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaTv className="h-5 w-5" />
                <span>TV Shows</span>
              </Link>
              <Link
                to="/people"
                className="flex items-center space-x-3 text-gray-700 dark:text-white hover:text-yellow-500 py-3 border-b border-gray-200 dark:border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>People</span>
              </Link>
              <Link
                to="/email"
                className="flex items-center space-x-3 text-gray-700 dark:text-white hover:text-yellow-500 py-3 border-b border-gray-200 dark:border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaEnvelope className="h-5 w-5" />
                <span>Contact</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
