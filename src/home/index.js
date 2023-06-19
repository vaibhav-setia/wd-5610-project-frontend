import NavBar from "../nav";
import { MDBInputGroup, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SearchBox from "./searchbox";

function Home() {
  return (
    <div>
      <NavBar />
      <h1 className="text-center mt-4 mb-8">Search your Favorite movies here!</h1>
      <SearchBox/>
    </div>
  );
}

export default Home;