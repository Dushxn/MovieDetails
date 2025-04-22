"use client"

import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BackdropImage from "../components/ui/backdrop-image"
import EpisodeCard from "../components/ui/episode-card"
import CastCard from "../components/ui/cast-card"
import LoadingSpinner from "../components/ui/loading-spinner"

const SeasonDetail = () => {
  const { tvId, seasonNumber } = useParams()
  const [tvShow, setTvShow] = useState(null)
  const [season, setSeason] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("episodes")

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch TV show and season data in parallel
      const [tvShowRes, seasonRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/tv/${tvId}?api_key=7814133f0a6956501920eaf4b35c8b59`),
        fetch(
          `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=7814133f0a6956501920eaf4b35c8b59`,
        ),
      ])

      // Parse responses
      const [tvShowData, seasonData] = await Promise.all([tvShowRes.json(), seasonRes.json()])

      setTvShow(tvShowData)
      setSeason(seasonData)
    } catch (error) {
      console.error("Error fetching season data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Reset active tab when season changes
    setActiveTab("episodes")
    // Scroll to top when season changes
    window.scrollTo(0, 0)
  }, [tvId, seasonNumber])

  if (loading) {
    return (
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    )
  }

  if (!tvShow || !season) {
    return (
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-900 text-white text-center">
        <h2 className="text-2xl font-bold">Season not found</h2>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section with Backdrop */}
      <BackdropImage imagePath={season.poster_path || tvShow.backdrop_path}>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center h-full pt-24 md:pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Season Poster */}
          <motion.div
            className="w-64 md:w-80 flex-shrink-0 mb-8 md:mb-0 md:mr-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={
                season.poster_path
                  ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={season.name}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </motion.div>

          {/* Season Details */}
          <motion.div
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-2">
              <Link to={`/tvinfo/${tvId}`} className="text-yellow-500 hover:text-yellow-400 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Back to {tvShow.name}</span>
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{season.name}</h1>

            <div className="flex items-center flex-wrap gap-4 mb-6">
              <div className="px-3 py-1 bg-yellow-500 text-black font-semibold rounded-full">
                {season.episodes?.length} Episodes
              </div>

              {season.air_date && (
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">Air Date:</span>
                  <span>{new Date(season.air_date).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {season.overview && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Overview</h3>
                <p className="text-gray-300">{season.overview}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <motion.button
                className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-full flex items-center space-x-2 hover:bg-yellow-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("episodes")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>View Episodes</span>
              </motion.button>

              {season.episodes?.some((episode) => episode.guest_stars?.length > 0) && (
                <motion.button
                  className="px-6 py-3 bg-gray-800 text-white font-bold rounded-full flex items-center space-x-2 hover:bg-gray-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("cast")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span>View Cast</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </BackdropImage>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-gray-800 mb-8">
          <nav className="flex space-x-8">
            {["episodes", "cast"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm sm:text-base capitalize transition-colors ${
                  activeTab === tab
                    ? "border-yellow-500 text-yellow-500"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Episodes Tab */}
            {activeTab === "episodes" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Episodes</h2>
                {season.episodes?.length > 0 ? (
                  <div className="space-y-6">
                    {season.episodes.map((episode) => (
                      <EpisodeCard key={episode.id} episode={episode} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No episodes available.</p>
                )}
              </div>
            )}

            {/* Cast Tab */}
            {activeTab === "cast" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Cast</h2>
                {season.episodes?.some((episode) => episode.guest_stars?.length > 0) ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {/* Get unique cast members across all episodes */}
                    {Array.from(
                      new Map(
                        season.episodes
                          .flatMap((episode) => episode.guest_stars || [])
                          .map((person) => [person.id, person]),
                      ).values(),
                    ).map((person) => (
                      <CastCard
                        key={person.id}
                        id={person.id}
                        image={person.profile_path}
                        name={person.name}
                        character={person.character}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No cast information available.</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SeasonDetail
