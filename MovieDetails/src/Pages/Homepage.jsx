import React from 'react'
import MovieCard from './components/MovieCard'
import { useState, useEffect } from 'react'

const Homepage = () => {

  const[movies , setMovies] = useState([])
  const[series , setSeries] = useState([])

  const fetchMovies = async () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=7814133f0a6956501920eaf4b35c8b59&page=1')
    .then(response => response.json())
    .then(json => setMovies(json.results));
  };

  const fetchSeries = async () => {
    fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=7814133f0a6956501920eaf4b35c8b59')
      .then(response => response.json())
      .then(json => setSeries(json.results));
  };

  useEffect(() => {
    fetchMovies();
    fetchSeries();
  }, []);

  console.log(series)
  return (
    <div>
      <div className='flex flex-wrap justify-between mx-10'>
        <div>
          <h1 className="text-3xl text-center font-bold text-black mt-32">Popular Movies</h1>
        </div>
        <div>
          <a href=""><h4 className='mt-32 bg-black text-white p-2 rounded hover:text-cyan-400 '>See more</h4></a>
        </div>
      </div>
       <MovieCard data={movies}/>

       <div className='flex flex-wrap justify-between mx-10'>
        <div>
          <h1 className="text-3xl text-center font-bold text-black mt-10">Popular Tv Shows</h1>
        </div>
        <div>
          <a href=""><h4 className='mt-10 bg-black text-white p-2 rounded hover:text-cyan-400 '>See more</h4></a>
        </div>
      </div>
       <MovieCard data={series}/>
    </div>
  )
}

export default Homepage
