import React, { useState } from 'react';

const SingleSection = ({ nowPlaying, trailerkey }) => {
    const [showTrailer, setShowTrailer] = useState(false);

    const handlePlayTrailer = () => {
        setShowTrailer(true);
    };

    const handleCloseTrailer = () => {
        setShowTrailer(false);
    };

    return (
        <div>
            <div
                className="relative overflow-hidden h-screen z-0 flex flex-col-reverse md:flex-row items-center justify-center"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${nowPlaying.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(60%) blur(4px)',
                }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            <div className='absolute inset-0 flex gap-y-5 flex-col justify-center items-center text-center z-10'>
                <h1 className='text-[#F5C518] text-[40px] sm:text-[60px] md:text-[70px] lg:text-[80px] font-bold'>{nowPlaying.title}</h1>
                <p className='text-white text-[20px] sm:text-[40px] md:text-[50x]'>{nowPlaying.tagline}</p>
                <button
                    onClick={handlePlayTrailer}
                    className="mt-4 px-6 py-2 bg-[#F5C518] text-black font-bold text-lg rounded-lg hover:bg-[#F39C12] transition-all"
                >
                    Play Trailer
                </button>
            </div>


            {showTrailer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                    <div className="relative w-full max-w-4xl h-[70vh]">
                        <iframe
                            className="w-full h-full rounded-lg"
                            src={`https://www.youtube.com/embed/${trailerkey.key}?autoplay=1`}
                            title="Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <button
                            onClick={handleCloseTrailer}
                            className="absolute top-4 right-4 bg-[#F5C518] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#F39C12] transition-all"
                        >
                            Close Trailer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleSection;
