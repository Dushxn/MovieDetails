import React from 'react'
import {Link} from 'react-router-dom';

const TvCard = ({data}) => {
  return (
    <div className='flex flex-wrap justify-around mt-10 mx-5'>
      {data.map((tv) => (
        <div key={tv.id} className='max-w-2xs rounded overflow-hidden shadow-lg mb-5' id='movieCard'>
          <Link to={`/tvinfo/${tv.id}`} >
          <img className='w-full' src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt={tv.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{tv.name}</div>
            <p className="text-gray-700 text-base">Rating: {tv.vote_average}</p>
          </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default TvCard
