import React from 'react';
import { Link } from 'react-router-dom';

const TvRow = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Loading...</div>; // Loading indicator
  }

  return (
    <div className="flex flex-wrap justify-around mt-10 mx-5">
      {data
        .slice(0, 12)
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <div
            key={movie.id}
            className="relative group h-40 sm:h-56 md:h-80 w-28 sm:w-40 md:w-60 lg:max-w-xs mr-2 sm:mr-2 md:mr-4 lg:mr-5 rounded overflow-hidden shadow-lg mb-8"
          >
            <Link to={`/tvinfo/${movie.id}`}>
              {/* Cover image that fully wraps the card */}
              <div className="relative">
                <img
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                />
              </div>
              {/* Overlay for title, rating, and release year */}
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-end text-white text-center p-4 transition-opacity duration-300">
                <div className="font-bold text-start text-sm sm:text-lg sm:text-xl mb-2 text-yellow-400">
                  {movie.title || movie.name}
                </div>
                {/* Rating as a styled button */}
                <div className="flex items-start justify-start space-x-2">
                  <div className="px-2 sm:px-2 py-1 sm:py-2 bg-yellow-500 text-black text-xs sm:text-sm md:text-base font-semibold rounded-full shadow-md flex items-center">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </div>
                  {/* Year as a styled button */}
                  <div className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-700 text-white text-xs sm:text-sm md:text-base font-semibold rounded-full shadow-md">
                    {new Date(movie.first_air_date).getFullYear()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default TvRow;
