import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TopRated = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNowPlaying = async (page) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=${page}`);
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
    <div className='mt-10 mx-5'>
      <div className='flex flex-wrap justify-around mt-32'>
        {nowPlaying.filter(movie => movie.poster_path).slice(0,18).map((movie) => (
          <div key={movie.id} className='max-w-2xs rounded overflow-hidden shadow-lg mb-5'>
            <Link to={`/info/${movie.id}`}>
              <img className='w-full' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{movie.title || movie.name}</div>
                <p className="text-gray-700 text-base">Rating: {movie.vote_average}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-5 mb-10'>
        <button
          onClick={handlePreviousPage}
          className='bg-black text-white px-4 py-2 rounded-l hover:bg-gray-400 hover:text-black'
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className='bg-black text-white px-4 py-2 '>
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={handleNextPage}
          className='bg-black text-white px-4 py-2 rounded-r hover:bg-gray-400 hover:text-black'
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TopRated;