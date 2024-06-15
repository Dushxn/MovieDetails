import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 right-0 bg-black mt-5 rounded-lg mx-auto max-w-7xl px-4 py-3 z-10'>
      <div className='flex justify-between items-center'>
        <div className='flex space-x-5'>
        <Link to={`/`}> <a href="#" className='text-white hover:text-cyan-300 hover:scale-95'>Home</a></Link>
          <a href="#" className='text-white hover:text-cyan-300 hover:scale-95'>Movies</a>
          <a href="#" className='text-white hover:text-cyan-300 hover:scale-95'>Tv shows</a>
          <a href="#" className='text-white hover:text-cyan-300 hover:scale-95'>Contact us</a>
        </div>
        <div className='flex items-center'>
          <input 
            type="text" 
            placeholder="Search..." 
            className="rounded-lg p-1 opacity-90 pl-4"
          />
          <FaSearch className="ml-2 text-white" /> 
        </div>
      </div>
    </div>
  );
}

export default Navbar;
