import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState('');
  let navigate = useNavigate(); 

  const routeChange = () => {
    setSearchValue('');
    navigate('/search/' + searchValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      routeChange();
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
        placeholder="Search..."
        aria-label="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-700 focus:outline-none"
        onClick={routeChange}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
