import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const SearchBox = () =>{
    const [searchValue, setSearchValue] = useState('');
    let navigate = useNavigate(); 
    const routeChange = () => {
     
      setSearchValue('');
      navigate('/search/'+searchValue);
    };
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        routeChange();
      }
    };
  
return(
<div className="input-group mb-3">
<input
  type="text"
  className="form-control"
  placeholder="Search..."
  aria-label="Search"
  aria-describedby="search-button"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  onKeyPress={handleKeyPress}
/>
<button className="btn btn-outline-primary" type="button" id="search-button" onClick={routeChange}>
  Search
</button>
</div>
);
}

export default SearchBox;