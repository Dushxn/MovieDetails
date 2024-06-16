import React from 'react'
import { useState, useEffect } from 'react'
import MovieRow from './components/MovieRow';
import { Link } from 'react-router-dom';

const Movies = () => {

  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const fetchNowPlaying = async () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=1`)
      .then(response => response.json())
      .then(json => setNowPlaying(json));
  };

  const fetchUpcoming = async () => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=1`)
      .then(response => response.json())
      .then(json => setUpcoming(json));
  };

  console.log(nowPlaying)
  const fetchPopular = async () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=1`)
      .then(response => response.json())
      .then(json => setPopular(json));
  };

  const fetchTopRated = async () => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=1`)
      .then(response => response.json())
      .then(json => setTopRated(json));
  };

  useEffect(() => {
    fetchNowPlaying();
    fetchUpcoming();
    fetchPopular();
    fetchTopRated();
  }, []);

  const nowPlay = nowPlaying.results;
  const upcome = upcoming.results;
  const pop = popular.results;
  const top = topRated.results;

  return (
    <>
      <div className='flex flex-wrap justify-between mx-10'>
        <div>
          <h1 className="text-3xl text-center font-bold text-black mt-32 ml-5">Now Playing</h1>
        </div>
        <div>
      <Link to={`/allmovies`}>    <a href=""><h4 className='mr-8 mt-32 bg-black text-white p-2 rounded hover:text-cyan-400 '>See more</h4></a></Link>
        </div>
        <div>
          <MovieRow data={nowPlay} />
        </div>
      </div>

      <div className='flex flex-wrap justify-between mx-10'>
        <div>
          <h1 className="text-3xl text-center font-bold text-black mt-32 ml-5">Upcoming Movies</h1>
        </div>
        <div>
        <Link to={`/upcoming`}>  <a href=""><h4 className='mr-8 mt-32 bg-black text-white p-2 rounded hover:text-cyan-400 '>See more</h4></a></Link>
        </div>
        <div>
          <MovieRow data={upcome} />
        </div>
      </div>

      <div className='flex flex-wrap justify-between mx-10'>
        <div>
          <h1 className="text-3xl text-center font-bold text-black mt-32 ml-5">Popular Movies</h1>
        </div>
        <div>
        <Link to={`/popular`}> <a href=""><h4 className='mr-8 mt-32 bg-black text-white p-2 rounded hover:text-cyan-400 '>See more</h4></a></Link> 
        </div>
        <div>
          <MovieRow data={pop} />
        </div>
      </div>

      <div className='flex flex-wrap justify-between mx-10'>
        <div>
          <h1 className="text-3xl text-center font-bold text-black mt-32 ml-5">Top Rated </h1>
        </div>
        <div>
        <Link to={`/toprated`}>  <a href=""><h4 className='mr-8 mt-32 bg-black text-white p-2 rounded hover:text-cyan-400 '>See more</h4></a></Link>
        </div>
        <div>
          <MovieRow data={top} />
        </div>
      </div>
    </>
  )
}

export default Movies
