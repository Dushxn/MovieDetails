import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const AllMovies = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNowPlaying = async (page) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=${page}`
      );
      const json = await response.json();
      setNowPlaying(json.results || []);
      setTotalPages(json.total_pages);
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
    }
  };

  useEffect(() => {
    fetchNowPlaying(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!nowPlaying || nowPlaying.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10 mx-5">
      {/* Movie Cards */}
      <div className="flex flex-wrap justify-around mt-32">
        {nowPlaying
          .filter((movie) => movie.poster_path)
          .slice(0, 18)
          .map((movie) => (
            <div
              key={movie.id}
              className="relative group h-40 sm:h-56 md:h-80 w-28 sm:w-40 md:w-60 lg:max-w-xs mr-2 sm:mr-2 md:mr-4 lg:mr-5 rounded overflow-hidden shadow-lg mb-8"
            >
              <Link to={`/info/${movie.id}`}>
                {/* Cover image */}
                <div className="relative">
                  <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                  />
                </div>
                {/* Overlay for title and rating */}
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-end text-white text-center p-4 transition-opacity duration-300">
                  <div className="font-bold text-start text-sm sm:text-lg sm:text-xl mb-2 text-yellow-400">
                    {movie.title || movie.name}
                  </div>
                  <div className="flex items-start justify-start space-x-2">
                    {/* Rating */}
                    <div className="px-2 sm:px-2 py-1 sm:py-2 bg-yellow-500 text-black text-xs sm:text-sm md:text-base font-semibold rounded-full shadow-md flex items-center">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </div>
                    {/* Release Year */}
                    <div className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-700 text-white text-xs sm:text-sm md:text-base font-semibold rounded-full shadow-md">
                      {new Date(movie.release_date).getFullYear()}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-5 mb-10">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 rounded-l ${
            currentPage === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-400 hover:text-black'
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="px-4 py-2 bg-black text-white">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 rounded-r ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-400 hover:text-black'
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
