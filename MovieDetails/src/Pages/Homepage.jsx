"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import MediaGrid from "./components/ui/media-grid"
import SectionHeader from "./components/ui/section-header"
import LoadingSpinner from "./components/ui/loading-spinner"
import { useTheme } from "../context/theme-context"

const Homepage = () => {
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [topRated, setTopRated] = useState([])
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const { theme } = useTheme()

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=7814133f0a6956501920eaf4b35c8b59&page=1",
      )
      const json = await response.json()
      setMovies(json.results)
    } catch (error) {
      console.error("Error fetching popular movies:", error)
    }
  }

  const fetchSeries = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/tv/day?api_key=7814133f0a6956501920eaf4b35c8b59",
      )
      const json = await response.json()
      setSeries(json.results)
    } catch (error) {
      console.error("Error fetching trending TV shows:", error)
    }
  }

  const fetchTopRated = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=1",
      )
      const json = await response.json()
      setTopRated(json.results)
    } catch (error) {
      console.error("Error fetching top rated movies:", error)
    }
  }

  const fetchTrending = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/week?api_key=7814133f0a6956501920eaf4b35c8b59",
      )
      const json = await response.json()
      setTrending(json.results)
    } catch (error) {
      console.error("Error fetching trending content:", error)
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true)
      await Promise.all([fetchMovies(), fetchSeries(), fetchTopRated(), fetchTrending()])
      setLoading(false)
    }

    fetchAllData()
  }, [])

  // Rotate hero banner every 8 seconds
  useEffect(() => {
    if (trending.length > 0) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % trending.length)
      }, 8000)

      return () => clearInterval(interval)
    }
  }, [trending])

  if (loading) {
    return (
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    )
  }

  const currentHero = trending[currentHeroIndex] || {}
  const heroTitle = currentHero.title || currentHero.name || ""
  const heroOverview = currentHero.overview || ""
  const heroBackdrop = currentHero.backdrop_path
  const heroId = currentHero.id
  const isMovie = currentHero.media_type === "movie" || currentHero.title
  const heroLink = isMovie ? `/info/${heroId}` : `/tvinfo/${heroId}`
  const heroYear = currentHero.release_date
    ? new Date(currentHero.release_date).getFullYear()
    : currentHero.first_air_date
      ? new Date(currentHero.first_air_date).getFullYear()
      : null

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${heroBackdrop})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/70 to-gray-50/30 dark:from-gray-900 dark:via-gray-900/70 dark:to-gray-900/30 transition-colors duration-300" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-block px-3 py-1 mb-4 bg-yellow-500 text-black text-sm font-semibold rounded-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {isMovie ? "Movie" : "TV Show"}
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {heroTitle}
            </motion.h1>

            <motion.div
              className="flex items-center space-x-4 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{currentHero.vote_average?.toFixed(1)}</span>
              </div>

              {heroYear && <div className="text-gray-600 dark:text-gray-300">{heroYear}</div>}
            </motion.div>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl line-clamp-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {heroOverview}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link to={heroLink}>
                <motion.button
                  className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-full flex items-center space-x-2 hover:bg-yellow-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Watch Trailer</span>
                </motion.button>
              </Link>

              <Link to={heroLink}>
                <motion.button
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white font-bold rounded-full flex items-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>More Info</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-800 dark:text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </motion.section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Popular Movies */}
        <section className="mb-16">
          <SectionHeader title="Popular Movies" linkTo="/popular" />
          <MediaGrid data={movies} linkPrefix="/info/" type="movie" />
        </section>

        {/* Popular TV Shows */}
        <section className="mb-16">
          <SectionHeader title="Popular TV Shows" linkTo="/popularshow" />
          <MediaGrid data={series} linkPrefix="/tvinfo/" type="tv" />
        </section>

        {/* Top Rated Movies */}
        <section className="mb-16">
          <SectionHeader title="Top Rated Movies" linkTo="/toprated" />
          <MediaGrid data={topRated} linkPrefix="/info/" type="movie" />
        </section>

        {/* Trending This Week */}
        <section>
          <SectionHeader title="Trending This Week" />
          <MediaGrid
            data={trending}
            linkPrefix={(item) => (item.media_type === "movie" ? "/info/" : "/tvinfo/")}
            type="mixed"
          />
        </section>
      </div>
    </div>
  )
}

export default Homepage
