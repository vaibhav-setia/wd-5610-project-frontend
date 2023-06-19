import NavBar from "../nav";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SearchBox from "./searchbox";
function Home() {

  return (
    <div >
      <NavBar />
     
      <h1>Home</h1>
     <SearchBox/>
    
    </div>
  );
}

export default Home;
