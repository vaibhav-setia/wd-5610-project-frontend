
import { MDBInputGroup, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
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
    <div className="flex justify-center">
      <MDBInputGroup className="w-80">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          aria-label="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <MDBBtn
          color="primary"
          onClick={routeChange}
          disabled={!searchValue} // Disable the button if searchValue is empty
        >
         Search
        </MDBBtn>
      </MDBInputGroup>
    </div>
  );
};

export default SearchBox;
