import NavBar from "../nav";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SearchBox from "./searchbox";
import ReviewCard from "./reviewcard";

function Home() {
  const getAllReviews = async () => {
    const url = `http://localhost:3001/api/review/getAllReviews?limit=20&pageNo=1`;

    let apiResponse = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const jsonResponse = await apiResponse.json();

    return jsonResponse;
  };

  let [data, setData] = useState([]);

  useEffect(() => {
    getAllReviews().then((response) => {
      setData(response.data);
    });
  }, []);

  console.log(data);

  return (
    <div>
      <NavBar />
      <div style={{marginLeft:"20%"}} className="w-3/5 gap-4 mt-8 animate-fade-in">
        <SearchBox />
      </div>
      
      <div className="grid grid-cols-1 gap-4 mt-8">
      <div className=" py-8">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-blue-500 text-4xl font-bold text-center animate-fade-in">
              Catch all the movie reviews here!
            </h1>
          </div>
        </div>

        {Object.keys(data).length ? (
          data.map((movie) => (
            <ReviewCard movie={movie} data={data} setData={setData} key={movie.id} />
          ))
        ) : (
          <p className="text-center">No reviews found.</p>
        )}
      </div>
    </div>
  );

}

export default Home;
