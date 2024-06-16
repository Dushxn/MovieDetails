import React from 'react'
import { Link } from 'react-router-dom'

const MovieRow = ({data}) => {

  if (!data || data.length === 0) {
    return <div>Loading...</div>; // You can replace this with any loading indicator you prefer
  }


  return (
    <div className='flex flex-wrap justify-around mt-10 mx-5'>
      {data.slice(0,12).map((movie) => (
        <div key={movie.id} className='max-w-2xs rounded overflow-hidden shadow-lg mb-5'>
          <Link to={`/info/${movie.id}`} >
          <img className='w-full' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{movie.title || movie.name}</div>
            <p className="text-gray-700 text-base">Rating: {movie.vote_average}</p>
          </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default MovieRow
