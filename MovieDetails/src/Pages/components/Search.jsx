import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Search = () => {
  const { search } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [searchShow, setSearchShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSearch = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=7814133f0a6956501920eaf4b35c8b59&query=${search}`);
      const json = await response.json();
      setSearchResult(json.results || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchShow = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=7814133f0a6956501920eaf4b35c8b59&query=${search}`);
      const json = await response.json();
      setSearchShow(json.results || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearch();
    fetchSearchShow();
  }, [search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
    <h1 className="text-3xl text-center font-bold text-black mt-32">Search Results</h1>
    <h1 className="text-3xl ml-10 font-bold text-black mt-10">Movies</h1>
      <div className='flex flex-wrap justify-around  mx-5 mt-5'>
        {searchResult.filter(movie => movie.poster_path).map((movie) => (
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

      <h1 className="text-3xl ml-10 font-bold text-black mt-10">Tv Shows</h1>
      <div className='flex flex-wrap justify-around  mx-5 mt-5'>
        {searchShow.filter(movie => movie.poster_path).map((movie) => (
          <div key={movie.id} className='max-w-2xs rounded overflow-hidden shadow-lg mb-5'>
            <Link to={`/tvinfo/${movie.id}`}>
              <img className='w-full' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{movie.title || movie.name}</div>
                <p className="text-gray-700 text-base">Rating: {movie.vote_average}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
