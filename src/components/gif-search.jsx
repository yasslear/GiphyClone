import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const GifSearch = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const searchGif = () => {
    if (query.trim() === "") {
      return;
    }
    navigate(`/search/${query}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchGif();
    }
  };

  return (
    <div className='relative'>
      <div className={`flex relative bg-white rounded-xl shadow-lg transition-all duration-300 ${isFocused ? 'ring-2 ring-purple-500 shadow-xl' : ''}`}>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <HiMagnifyingGlass size={20} />
        </div>
        <input 
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder='Search for GIFs, stickers, and more...'
          className='w-full pl-12 pr-4 sm:pr-32 py-4 text-sm sm:text-base text-gray-800 rounded-xl outline-none placeholder-gray-500'
        />
        <button
          onClick={searchGif}
          disabled={query.trim() === ""}
          className='absolute right-2 top-2 bottom-2 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-md'
        >
          <span className="hidden sm:inline">Search</span>
          <HiMagnifyingGlass size={18} className="sm:hidden" />
        </button>
      </div>
    </div>
  );
};

export default GifSearch;
