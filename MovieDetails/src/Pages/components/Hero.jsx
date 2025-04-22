import React, { useState, useEffect } from 'react';
import { FaStar, FaCalendarAlt } from 'react-icons/fa';

const MovieHeader = ({ nowPlaying = [] }) => {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    // Function to change movie every 8 seconds
    useEffect(() => {
        if (nowPlaying.length > 0) {
            const interval = setInterval(() => {
                setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % nowPlaying.length);
            }, 16000); // 16 seconds interval

            return () => clearInterval(interval); // Cleanup the interval
        }
    }, [nowPlaying]);

    if (!nowPlaying || nowPlaying.length === 0) {
        return <div>Loading...</div>; // Loading indicator while fetching movies
    }

    const currentMovie = nowPlaying[currentMovieIndex];

    return (
        <div>
            <div
                className="relative overflow-hidden h-screen z-0 flex flex-col-reverse md:flex-row items-center justify-center"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${currentMovie.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(60%) blur(4px)', // Apply blur here to the background only
                }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div> {/* Overlay for dark effect */}

            <div className="flex flex-row z-10 absolute top-56 sm:top-36 md:top-32 md:inset-x-36 sm:inset-x-5 mb-32 justify-between px-10 sm:px-0">
                <div className="mx-8">
                    <img
                        className="rounded-lg w-full h-[350px] md:h-[600px] sm:h-[400px] mt object-cover" // Set fixed size for image
                        src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                        alt={currentMovie.title}
                    />
                </div>
                <div className="text-white w-1/2 sm:w-1/2 md:w-2/3 pl-10 mt-5">
                    <h2 className="text-[25px] sm:text-lg md:text-3xl mb-5 lg:md:text-[40px] font-bold text-[#F5C518]">
                        {currentMovie.title}
                    </h2>
                    <div className="flex items-center mt-2">
                        <FaStar className="mr-2 text-[#F5C518]" /> {/* Change star icon color to IMDb yellow */}
                        <span>{currentMovie.vote_average}</span>
                        <span className="ml-4 flex gap-x-3">
                            <FaCalendarAlt className="mr-2 text-white" /> {/* Change year icon color to IMDb white */}
                            {new Date(currentMovie.release_date).getFullYear()}
                        </span>
                    </div>
                    <p className="text-[14px] sm:text-lg md:text-[15px] lg:text-[20px] text-justify mt-4">{currentMovie.overview}</p>
                    <button className="mt-4 px-6 py-2 bg-[#F5C518] text-black font-bold text-lg rounded-lg hover:bg-[#F39C12] transition-all">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieHeader;
