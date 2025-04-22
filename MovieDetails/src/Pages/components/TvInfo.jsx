"use client"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import BackdropImage from "./ui/backdrop-image"
import RatingBadge from "./ui/rating-badge"
import CastCard from "./ui/cast-card"
import SeasonCard from "./ui/season-card"
import VideoPlayer from "./ui/video-player"
import GalleryModal from "./ui/gallery-modal"
import MediaGrid from "./ui/media-grid"
import LoadingSpinner from "./ui/loading-spinner"

const TvInfo = () => {
  const { id } = useParams()
  const [tvShow, setTvShow] = useState(null)
  const [videos, setVideos] = useState([])
  const [photos, setPhotos] = useState({ backdrops: [], posters: [] })
  const [credits, setCredits] = useState({ cast: [], crew: [] })
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [showGallery, setShowGallery] = useState(false)
  const [galleryType, setGalleryType] = useState("backdrops")
  const [galleryIndex, setGalleryIndex] = useState(0)

  const fetchTvData = async () => {
    setLoading(true)
    try {
      // Fetch all data in parallel
      const [tvRes, videosRes, photosRes, creditsRes, recommendationsRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=7814133f0a6956501920eaf4b35c8b59`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=7814133f0a6956501920eaf4b35c8b59`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/images?api_key=7814133f0a6956501920eaf4b35c8b59`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=7814133f0a6956501920eaf4b35c8b59`),
        fetch(
          `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=1`,
        ),
      ])

      // Parse all responses
      const [tvData, videosData, photosData, creditsData, recommendationsData] = await Promise.all([
        tvRes.json(),
        videosRes.json(),
        photosRes.json(),
        creditsRes.json(),
        recommendationsRes.json(),
      ])

      setTvShow(tvData)
      setVideos(videosData.results || [])
      setPhotos({
        backdrops: photosData.backdrops || [],
        posters: photosData.posters || [],
      })
      setCredits({
        cast: creditsData.cast || [],
        crew: creditsData.crew || [],
      })
      setRecommendations(recommendationsData.results || [])
    } catch (error) {
      console.error("Error fetching TV show data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTvData()
    // Reset active tab when TV show changes
    setActiveTab("overview")
    // Scroll to top when TV show changes
    window.scrollTo(0, 0)
  }, [id])

  const openGallery = (type, index) => {
    setGalleryType(type)
    setGalleryIndex(index)
    setShowGallery(true)
  }

  const getCreators = () => {
    return tvShow?.created_by || []
  }

  if (loading) {
    return (
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    )
  }

  if (!tvShow) {
    return (
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-900 text-white text-center">
        <h2 className="text-2xl font-bold">TV show not found</h2>
      </div>
    )
  }

  const trailerVideo = videos.find((video) => video.type === "Trailer") || videos[0]
  const galleryImages = galleryType === "backdrops" ? photos.backdrops : photos.posters
  const creators = getCreators()

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section with Backdrop */}
      <BackdropImage imagePath={tvShow.backdrop_path}>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center h-full pt-24 md:pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Poster */}
          <motion.div
            className="w-64 md:w-80 flex-shrink-0 mb-8 md:mb-0 md:mr-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative group">
              <motion.img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
                className="w-full h-auto rounded-lg shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => openGallery("posters", 0)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300 rounded-lg">
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
            </div>
          </motion.div>

          {/* TV Show Details */}
          <motion.div
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center mb-4">
              {tvShow.genres?.map((genre) => (
                <span key={genre.id} className="mr-2 mb-2 px-3 py-1 bg-gray-800 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{tvShow.name}</h1>

            {tvShow.tagline && <p className="text-xl text-gray-400 italic mb-4">{tvShow.tagline}</p>}

            <div className="flex items-center flex-wrap gap-4 mb-6">
              <RatingBadge rating={tvShow.vote_average} size="large" />

              <div className="flex items-center">
                <span className="text-gray-400 mr-2">First Air:</span>
                <span>{new Date(tvShow.first_air_date).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Status:</span>
                <span>{tvShow.status}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-gray-300">{tvShow.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {creators.length > 0 && (
                <div>
                  <span className="text-gray-400 block">Created by:</span>
                  <div>
                    {creators.map((creator, index) => (
                      <span key={creator.id}>
                        <Link to={`/person/${creator.id}`} className="hover:text-yellow-500 transition-colors">
                          {creator.name}
                        </Link>
                        {index < creators.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {tvShow.networks?.length > 0 && (
                <div>
                  <span className="text-gray-400 block">Network:</span>
                  <div className="flex items-center space-x-2">
                    {tvShow.networks[0].logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${tvShow.networks[0].logo_path}`}
                        alt={tvShow.networks[0].name}
                        className="h-6 object-contain bg-white p-1 rounded"
                      />
                    ) : null}
                    <span>{tvShow.networks[0].name}</span>
                  </div>
                </div>
              )}

              {tvShow.number_of_seasons > 0 && (
                <div>
                  <span className="text-gray-400 block">Seasons:</span>
                  <span>{tvShow.number_of_seasons}</span>
                </div>
              )}

              {tvShow.number_of_episodes > 0 && (
                <div>
                  <span className="text-gray-400 block">Episodes:</span>
                  <span>{tvShow.number_of_episodes}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {trailerVideo && (
                <motion.button
                  className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-full flex items-center space-x-2 hover:bg-yellow-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("videos")}
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
              )}

              {tvShow.seasons?.length > 0 && (
                <motion.button
                  className="px-6 py-3 bg-gray-800 text-white font-bold rounded-full flex items-center space-x-2 hover:bg-gray-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("seasons")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  <span>View Seasons</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </BackdropImage>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-gray-800 mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {["overview", "cast", "seasons", "videos", "photos", "recommendations"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm sm:text-base capitalize transition-colors whitespace-nowrap ${
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
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Storyline</h2>
                    <p className="text-gray-300 mb-6">{tvShow.overview}</p>

                    {/* Additional details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {tvShow.type && (
                        <div>
                          <span className="text-gray-400 block">Type:</span>
                          <span>{tvShow.type}</span>
                        </div>
                      )}

                      {tvShow.original_language && (
                        <div>
                          <span className="text-gray-400 block">Original Language:</span>
                          <span>{tvShow.original_language.toUpperCase()}</span>
                        </div>
                      )}

                      {tvShow.episode_run_time?.length > 0 && (
                        <div>
                          <span className="text-gray-400 block">Episode Runtime:</span>
                          <span>{tvShow.episode_run_time[0]} minutes</span>
                        </div>
                      )}

                      {tvShow.in_production !== undefined && (
                        <div>
                          <span className="text-gray-400 block">In Production:</span>
                          <span>{tvShow.in_production ? "Yes" : "No"}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Details</h2>

                    <div className="space-y-4">
                      {tvShow.networks?.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Networks</h3>
                          <div className="space-y-3">
                            {tvShow.networks.map((network) => (
                              <div key={network.id} className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg">
                                {network.logo_path ? (
                                  <img
                                    src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                                    alt={network.name}
                                    className="h-8 object-contain bg-white p-1 rounded"
                                  />
                                ) : (
                                  <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                                    <span className="text-xs">{network.name.charAt(0)}</span>
                                  </div>
                                )}
                                <span>{network.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {tvShow.production_companies?.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Production Companies</h3>
                          <div className="space-y-3">
                            {tvShow.production_companies.map((company) => (
                              <div key={company.id} className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg">
                                {company.logo_path ? (
                                  <img
                                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                    alt={company.name}
                                    className="h-8 object-contain bg-white p-1 rounded"
                                  />
                                ) : (
                                  <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                                    <span className="text-xs">{company.name.charAt(0)}</span>
                                  </div>
                                )}
                                <span>{company.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cast preview */}
                {credits.cast?.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Top Cast</h2>
                      <button
                        onClick={() => setActiveTab("cast")}
                        className="text-yellow-500 hover:text-yellow-400 flex items-center space-x-1"
                      >
                        <span>View All</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
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

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {credits.cast.slice(0, 5).map((person) => (
                        <CastCard
                          key={person.id}
                          id={person.id}
                          image={person.profile_path}
                          name={person.name}
                          character={person.character}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Seasons preview */}
                {tvShow.seasons?.length > 0 && (
                  <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Seasons</h2>
                      <button
                        onClick={() => setActiveTab("seasons")}
                        className="text-yellow-500 hover:text-yellow-400 flex items-center space-x-1"
                      >
                        <span>View All</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {tvShow.seasons
                        .filter((season) => season.season_number > 0)
                        .slice(0, 4)
                        .map((season) => (
                          <SeasonCard key={season.id} tvId={tvShow.id} season={season} />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cast Tab */}
            {activeTab === "cast" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
                  {credits.cast.map((person) => (
                    <CastCard
                      key={person.id}
                      id={person.id}
                      image={person.profile_path}
                      name={person.name}
                      character={person.character}
                    />
                  ))}
                </div>

                <h2 className="text-2xl font-bold mb-6">Crew</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {credits.crew
                    .filter((person, index, self) => index === self.findIndex((p) => p.id === person.id))
                    .map((person) => (
                      <CastCard
                        key={person.id}
                        id={person.id}
                        image={person.profile_path}
                        name={person.name}
                        character={person.job}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Seasons Tab */}
            {activeTab === "seasons" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Seasons</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {tvShow.seasons
                    .filter((season) => season.season_number > 0)
                    .map((season) => (
                      <SeasonCard key={season.id} tvId={tvShow.id} season={season} />
                    ))}
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === "videos" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Videos</h2>
                {videos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videos.map((video) => (
                      <VideoPlayer key={video.id} videoId={video.key} title={`${video.type}: ${video.name}`} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No videos available.</p>
                )}
              </div>
            )}

            {/* Photos Tab */}
            {activeTab === "photos" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Backdrops</h2>
                {photos.backdrops.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                    {photos.backdrops.map((image, index) => (
                      <div
                        key={image.file_path}
                        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => openGallery("backdrops", index)}
                      >
                        <motion.img
                          src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                          alt={`Backdrop ${index + 1}`}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 mb-12">No backdrops available.</p>
                )}

                <h2 className="text-2xl font-bold mb-6">Posters</h2>
                {photos.posters.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {photos.posters.map((image, index) => (
                      <div
                        key={image.file_path}
                        className="relative aspect-[2/3] cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => openGallery("posters", index)}
                      >
                        <motion.img
                          src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                          alt={`Poster ${index + 1}`}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No posters available.</p>
                )}
              </div>
            )}

            {/* Recommendations Tab */}
            {activeTab === "recommendations" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
                {recommendations.length > 0 ? (
                  <MediaGrid data={recommendations} linkPrefix="/tvinfo/" type="tv" />
                ) : (
                  <p className="text-gray-400">No recommendations available.</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <GalleryModal images={galleryImages} initialIndex={galleryIndex} onClose={() => setShowGallery(false)} />
      )}
    </div>
  )
}

export default TvInfo
