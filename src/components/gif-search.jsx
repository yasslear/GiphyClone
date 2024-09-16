import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GifSearch = () => {
  const [query, setQuery] = useState("");
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
    <div className='flex relative'>
      <input 
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Search for Gifs'
        className='w-full pl-4 pr-14 py-5 text-sm sm:text-xl text-black rounded outline-none'
      />
      <button
        onClick={searchGif}
        className='absolute right-0 top-0 h-full w-40 bg-blue-500 text-white rounded-tr rounded-br hover:bg-blue-400'
      >
        Search
      </button>
    </div>
  );
};

export default GifSearch;
