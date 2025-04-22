"use client"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import GalleryModal from "../components/ui/gallery-modal"
import LoadingSpinner from "../components/ui/loading-spinner"

const PersonDetail = () => {
  const { id } = useParams()
  const [person, setPerson] = useState(null)
  const [credits, setCredits] = useState({ cast: [], crew: [] })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("about")
  const [showGallery, setShowGallery] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [showFullBio, setShowFullBio] = useState(false)

  const fetchPersonData = async () => {
    setLoading(true)
    try {
      // Fetch all data in parallel
      const [personRes, creditsRes, imagesRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=7814133f0a6956501920eaf4b35c8b59`),
        fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=7814133f0a6956501920eaf4b35c8b59`),
        fetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=7814133f0a6956501920eaf4b35c8b59`),
      ])

      // Parse all responses
      const [personData, creditsData, imagesData] = await Promise.all([
        personRes.json(),
        creditsRes.json(),
        imagesRes.json(),
      ])

      setPerson(personData)
      setCredits({
        cast: creditsData.cast || [],
        crew: creditsData.crew || [],
      })
      setImages(imagesData.profiles || [])
    } catch (error) {
      console.error("Error fetching person data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPersonData()
    // Reset active tab when person changes
    setActiveTab("about")
    // Reset bio state
    setShowFullBio(false)
    // Scroll to top when person changes
    window.scrollTo(0, 0)
  }, [id])

  const openGallery = (index) => {
    setGalleryIndex(index)
    setShowGallery(true)
  }

  // Sort credits by popularity
  const sortedMovieCredits = [...(credits.cast || []), ...(credits.crew || [])]
    .filter((credit) => credit.media_type === "movie")
    .sort((a, b) => b.popularity - a.popularity)

  const sortedTVCredits = [...(credits.cast || []), ...(credits.crew || [])]
    .filter((credit) => credit.media_type === "tv")
    .sort((a, b) => b.popularity - a.popularity)

  // Remove duplicates
  const uniqueMovieCredits = sortedMovieCredits.filter(
    (credit, index, self) => index === self.findIndex((c) => c.id === credit.id),
  )

  const uniqueTVCredits = sortedTVCredits.filter(
    (credit, index, self) => index === self.findIndex((c) => c.id === credit.id),
  )

  if (loading) {
    return (
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    )
  }

  if (!person) {
    return (
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-900 text-white text-center">
        <h2 className="text-2xl font-bold">Person not found</h2>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <motion.div
            className="w-full md:w-1/3 lg:w-1/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative group rounded-xl overflow-hidden">
              <motion.img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={person.name}
                className="w-full h-auto rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => images.length > 0 && openGallery(0)}
              />
              {images.length > 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300 rounded-xl">
                  <div className="opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-95 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Personal Info */}
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-bold">Personal Info</h2>

              <div>
                <h3 className="text-gray-400 font-medium">Known For</h3>
                <p>{person.known_for_department}</p>
              </div>

              {person.gender !== undefined && (
                <div>
                  <h3 className="text-gray-400 font-medium">Gender</h3>
                  <p>{person.gender === 1 ? "Female" : person.gender === 2 ? "Male" : "Not specified"}</p>
                </div>
              )}

              {person.birthday && (
                <div>
                  <h3 className="text-gray-400 font-medium">Birthday</h3>
                  <p>{new Date(person.birthday).toLocaleDateString()}</p>
                  {person.deathday && (
                    <p className="text-gray-400">Died: {new Date(person.deathday).toLocaleDateString()}</p>
                  )}
                </div>
              )}

              {person.place_of_birth && (
                <div>
                  <h3 className="text-gray-400 font-medium">Place of Birth</h3>
                  <p>{person.place_of_birth}</p>
                </div>
              )}

              {person.also_known_as && person.also_known_as.length > 0 && (
                <div>
                  <h3 className="text-gray-400 font-medium">Also Known As</h3>
                  <ul className="space-y-1">
                    {person.also_known_as.slice(0, 3).map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                    {person.also_known_as.length > 3 && (
                      <li className="text-gray-400">+ {person.also_known_as.length - 3} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          {/* Person Details */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{person.name}</h1>

            {/* Tabs */}
            <div className="border-b border-gray-800 mb-6">
              <nav className="flex space-x-8">
                {["about", "movies", "tv shows", "photos"].map((tab) => (
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
                {/* About Tab */}
                {activeTab === "about" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Biography</h2>
                    {person.biography ? (
                      <div>
                        <p className="text-gray-300 whitespace-pre-line">
                          {showFullBio
                            ? person.biography
                            : person.biography.length > 600
                              ? person.biography.substring(0, 600) + "..."
                              : person.biography}
                        </p>
                        {person.biography.length > 600 && (
                          <button
                            onClick={() => setShowFullBio(!showFullBio)}
                            className="mt-2 text-yellow-500 hover:text-yellow-400"
                          >
                            {showFullBio ? "Show Less" : "Read More"}
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-400">No biography available.</p>
                    )}

                    {/* Known For Preview */}
                    {uniqueMovieCredits.length > 0 && (
                      <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Known For</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {uniqueMovieCredits.slice(0, 4).map((movie) => (
                            <Link key={movie.id} to={`/info/${movie.id}`} className="group">
                              <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                                <motion.img
                                  src={
                                    movie.poster_path
                                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                      : "https://via.placeholder.com/300x450?text=No+Image"
                                  }
                                  alt={movie.title}
                                  className="w-full h-full object-cover"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
                                <div className="absolute bottom-2 left-2 right-2">
                                  <p className="text-white font-medium">{movie.title}</p>
                                  <p className="text-gray-300 text-sm">
                                    {movie.character ? `as ${movie.character}` : movie.job || ""}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <button
                          onClick={() => setActiveTab("movies")}
                          className="mt-4 text-yellow-500 hover:text-yellow-400 flex items-center"
                        >
                          <span>View All Movies</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Movies Tab */}
                {activeTab === "movies" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Movies</h2>
                    {uniqueMovieCredits.length > 0 ? (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {uniqueMovieCredits.map((movie) => (
                            <Link
                              key={movie.id}
                              to={`/info/${movie.id}`}
                              className="group bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
                            >
                              <div className="relative aspect-video">
                                <img
                                  src={
                                    movie.backdrop_path
                                      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                                      : movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : "https://via.placeholder.com/500x281?text=No+Image"
                                  }
                                  alt={movie.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                                  {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-white group-hover:text-yellow-500 transition-colors">
                                  {movie.title}
                                </h3>
                                <p className="text-gray-300 text-sm mt-1">
                                  {movie.character ? `as ${movie.character}` : movie.job || ""}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400">No movie credits available.</p>
                    )}
                  </div>
                )}

                {/* TV Shows Tab */}
                {activeTab === "tv shows" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">TV Shows</h2>
                    {uniqueTVCredits.length > 0 ? (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {uniqueTVCredits.map((show) => (
                            <Link
                              key={show.id}
                              to={`/tvinfo/${show.id}`}
                              className="group bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
                            >
                              <div className="relative aspect-video">
                                <img
                                  src={
                                    show.backdrop_path
                                      ? `https://image.tmdb.org/t/p/w500${show.backdrop_path}`
                                      : show.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                                        : "https://via.placeholder.com/500x281?text=No+Image"
                                  }
                                  alt={show.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                                  {show.first_air_date ? new Date(show.first_air_date).getFullYear() : "N/A"}
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-white group-hover:text-yellow-500 transition-colors">
                                  {show.name}
                                </h3>
                                <p className="text-gray-300 text-sm mt-1">
                                  {show.character ? `as ${show.character}` : show.job || ""}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400">No TV show credits available.</p>
                    )}
                  </div>
                )}

                {/* Photos Tab */}
                {activeTab === "photos" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Photos</h2>
                    {images.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                          <div
                            key={image.file_path}
                            className="relative aspect-[2/3] cursor-pointer overflow-hidden rounded-lg"
                            onClick={() => openGallery(index)}
                          >
                            <motion.img
                              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                              alt={`${person.name} photo ${index + 1}`}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">No photos available.</p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <GalleryModal images={images} initialIndex={galleryIndex} onClose={() => setShowGallery(false)} />
      )}
    </div>
  )
}

export default PersonDetail
