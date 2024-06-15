import React from 'react';

const MovieCard = ({ data }) => {
  return (
    <div className='flex flex-wrap justify-around mt-10 mx-5'>
      {data.map((movie) => (
        <div key={movie.id} className='max-w-2xs rounded overflow-hidden shadow-lg mb-5'>
          <img className='w-full' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{movie.title || movie.name}</div>
            <p className="text-gray-700 text-base">Rating: {movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieCard;
