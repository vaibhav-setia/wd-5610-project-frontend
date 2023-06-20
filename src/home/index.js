import NavBar from "../nav";
import React, { useState } from "react";
import { useEffect } from "react";

import SearchBox from "./searchbox";

import ReviewCard from "./reviewcard";

function Home() {
  const getAllReviews = async () => {
    const url = `http://localhost:3001/api/review/getAllReviews?limit=20&pageNo=1`;

    let apiResonse = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const tjson = await apiResonse.json();

    return tjson;
  };
  let [data, setData] = useState([]);
  useEffect(() => {
    getAllReviews().then((response) => {
      setData(response.data);
    });
  }, []);
  console.log(data);
  return (
    <div className="container">
      <NavBar />

      <h1>Home</h1>
      <SearchBox />
      <div className="row">
        <div>
          {Object.keys(data).length
            ? data.map((movie) => (
                <ReviewCard movie={movie} data={data} setData={setData} />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Home;
