import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Youtube from 'react-youtube'
import { Link } from 'react-router-dom'

const TvInfo = () => {
  const { id } = useParams();

  const [Tv, setTv] = useState([]);
  const [video, setVideo] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [credits, setCredits] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const fetchTv = async () => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=7814133f0a6956501920eaf4b35c8b59`)
      .then(response => response.json())
      .then(json => setTv(json));
  };

  const fetchVideo = async () => {
    fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=7814133f0a6956501920eaf4b35c8b59`)
      .then(response => response.json())
      .then(json => setVideo(json))
      .catch(error => console.error('Error fetching video:', error));
  };

  const fetchPhotos = async () => {
    fetch(`https://api.themoviedb.org/3/tv/${id}/images?api_key=7814133f0a6956501920eaf4b35c8b59`)
      .then(response => response.json())
      .then(json => setPhotos(json));
  };

  const fetchCredits = async () => {
    fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=7814133f0a6956501920eaf4b35c8b59`)
      .then(response => response.json())
      .then(json => setCredits(json));
  };

  const fetchRecommendations = async () => {
    fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=7814133f0a6956501920eaf4b35c8b59&language=en-US&page=1`)
      .then(response => response.json())
      .then(json => setRecommendations(json));
  };

  const production_companies = Tv.production_companies || [];
  

  console.log(credits);

  useEffect(() => {
    fetchTv();
    fetchVideo();
    fetchPhotos();
    fetchCredits();
    fetchRecommendations();
  }, [id]);

  if (!Tv) {
    return <div>Loading...</div>;
  }

  // Find the official trailer video
  const officialTrailer = video?.results?.find(v => v.type === 'Trailer');
  const images = photos.backdrops || [];
  const images2 = photos.posters || [];
  const cast = credits.cast || [];
  const recommendations1 = recommendations.results || [];

  return (
    <>
      <div className='mt-32 flex justify-center'>
        <div className='flex flex-wrap max-w-5xl'>
          <div className='w-full md:w-1/2 flex justify-center'>
            <img className='w-96 rounded-lg' src={`https://image.tmdb.org/t/p/w500${Tv.poster_path}`} alt={Tv.title} />
          </div>
          <div className='w-full md:w-1/2 flex flex-col justify-center md:pl-8'>
            <h1 className='text-3xl font-bold text-black mb-4'>{Tv.name}</h1>
            <p className='text-gray-700 mb-5'>{Tv.overview}</p>
            <p className='text-gray-700 mb-5'><b>Rating:</b> {Tv.vote_average}</p>
            <p className='text-gray-700 mb-5'><b>Release Date:</b> {Tv.release_date}</p>
            <p className='text-gray-700 mb-5'><b>Runtime: </b>{Tv.runtime} minutes</p>
            {production_companies.slice(0,3).map(company => (
              <p key={company.id} className='text-gray-700 mb-5'><b>Production Company:</b> {company.name}</p>
            ))}
          </div>
        </div>
      </div>

      <div>
      <h1 className='text-3xl font-bold text-black mt-20 text-center mb-10'>Official Trailer</h1>
      <div className="mt-6 rounded- flex justify-center mb-10">
        {officialTrailer ? (
          <Youtube videoId={officialTrailer.key} />) :
          (<p className="text-white">Official Trailer not available.</p>)}
      </div>
      </div>
    
    <h1 className='text-3xl font-bold text-black mt-20 text-center mb-10'>Snapshots</h1>
      <div className='flex flex-wrap justify-between'>
      {images.slice(0,3).map((image) => (
        <img
          key={image.file_path}
          src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
          alt='Movie Poster'
          className='w-1/4  mb-5 rounded-lg mx-16'
        />
      ))}
      {images.slice(9,12).map((image) => (
        <img
          key={images2.file_path}
          src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
          alt='Movie Poster'
          className='w-1/4  mb-5 rounded-lg mx-16'
        />
      ))}
    </div>

    <h1 className='text-3xl font-bold text-black mt-20 text-center mb-10'>Cast</h1>
    <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cast.slice(0, 8).map((member) => (
          <div key={member.id} className="flex flex-col items-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
              alt={member.name}
              className="w-44 h-44 rounded-full object-cover mb-2"
            />
            <p className="text-center">{member.name}</p>
            <p className="text-center text-sm text-gray-500">{member.character}</p>
          </div>
        ))}
      </div>
    </div>
    
    <h1 className='text-3xl font-bold text-black mt-20 text-center mb-10'>Recommendations</h1>
      <div className='flex flex-wrap justify-around mt-10 mx-5'>
      {recommendations1.filter(movie => movie.poster_path).slice(0,6).map((movie) => (
        <div key={movie.id} className='max-w-2xs rounded overflow-hidden shadow-lg mb-5'>
          <Link to={`/tvinfo/${movie.id}`} >
          <img className='w-full' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{movie.title || movie.name}</div>
            <p className="text-gray-700 text-base">Rating: {movie.vote_average}</p>
          </div>
          </Link>
        </div>
        ))}
    </div>
    </>
  )
}

export default TvInfo
