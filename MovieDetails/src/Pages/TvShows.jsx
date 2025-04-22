import React from 'react'
import { useState, useEffect } from 'react'
import TvRow from './components/TvRow';
import { Link } from 'react-router-dom';

const TvShows = () => {

  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const fetchNowPlaying = async () => {
    fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=1`)
      .then(response => response.json())
      .then(json => setNowPlaying(json));
  };

  const fetchUpcoming = async () => {
    fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=1`)
      .then(response => response.json())
      .then(json => setUpcoming(json));
  };

  console.log(nowPlaying)
  const fetchPopular = async () => {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=1`)
      .then(response => response.json())
      .then(json => setPopular(json));
  };

  const fetchTopRated = async () => {
    fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=1`)
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
      <div className='flex flex-col justify-between mx-10'>
        <div className='flex justify-between'>
          <div>
            <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl text-center font-bold text-black mt-32 ml-5">Airing Today</h1>
          </div>
          <div>
            <Link to={`/airtoday`}>  <a href=""><h4 className='sm:text-md md:text-lg lg:text-lg mr-8 mt-32 bg-black text-white p-1 lg:p-2 rounded hover:text-cyan-400'>See more</h4></a></Link>
          </div>
        </div>
        <div>
          <TvRow data={nowPlay} />
        </div>
      </div>

      <div className='flex flex-col justify-between mx-10'>
        <div className='flex justify-between'>
          <div>
            <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl text-center font-bold text-black mt-32 ml-5">On the Air</h1>
          </div>
          <div>
            <Link to={`/onair`}> <a href=""><h4 className='sm:text-md md:text-lg lg:text-lg mr-8 mt-32 bg-black text-white p-1 lg:p-2 rounded hover:text-cyan-400 '>See more</h4></a></Link>
          </div>
        </div>
        <div>
          <TvRow data={upcome} />
        </div>
      </div>

      <div className='flex flex-col justify-between mx-10'>
        <div className='flex justify-between'>
          <div>
            <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl text-center font-bold text-black mt-32 ml-5">Popular Shows</h1>
          </div>
          <div>
            <Link to={`/popularshow`}>  <a href=""><h4 className='sm:text-md md:text-lg lg:text-lg mr-8 mt-32 bg-black text-white p-1 lg:p-2 rounded hover:text-cyan-400 '>See more</h4></a></Link>
          </div>
        </div>
        <div>
          <TvRow data={pop} />
        </div>
      </div>

      <div className='flex flex-col justify-between mx-10'>
      <div className='flex justify-between'>
        <div>
          <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl text-center font-bold text-black mt-32 ml-5">Top Rated </h1>
        </div>
        <div>
          <Link to={`/topratedshow`}>  <a href=""><h4 className='sm:text-md md:text-lg lg:text-lg mr-8 mt-32 bg-black text-white p-1 lg:p-2 rounded hover:text-cyan-400 '>See more</h4></a></Link>
        </div>
        </div>
        <div>
          <TvRow data={top} />
        </div>
      </div>
    </>
  )
}

export default TvShows
