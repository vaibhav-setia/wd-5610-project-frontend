import NavBar from "../nav";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchBox from "./searchbox";
import ReviewCard from "./reviewcard";
import { ProfileSpoilers } from "../profile/profile-spoilers";

function Home() {
  const getAllReviews = async (count) => {
    console.log(count)
    const url = `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/review/getAllReviews?limit=1&pageNo=`+count;
    
    let apiResponse = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const jsonResponse = await apiResponse.json();
    return jsonResponse;
  };
  const [loading, setLoading] = useState(false);
  let userId = useSelector((state) => state.user.id);
  let [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    getAllReviews(pageCount).then((response) => {
      setData(response.data);
      setLoading(true);
    });
  }, [userId]);
  const getMoreData = async () => {
    setPageCount(pageCount+1);
    getAllReviews(pageCount+1).then((response) => {
      setData(data => [...data, ...response.data]);
    });
  }

  return (
    <div>
      <NavBar />
      <div
        style={{ marginLeft: "20%" }}
        className="w-3/5 gap-4 mt-8 animate-fade-in"
      >
        <SearchBox />
      </div>

      <div className="grid grid-cols-8">
        <div
          className={`grid grid-cols-1 gap-4 mt-8 ${
            userId ? "col-span-5" : "col-span-8"
          }`}
        >
          <div className=" py-8">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-blue-500 text-4xl font-bold text-center animate-fade-in">
                Catch all the movie reviews here!
              </h1>
            </div>
          </div>

          {loading ? Object.keys(data).length ? (
            data.map((movie) => (
              <ReviewCard
                movie={movie}
                data={data}
                setData={setData}
                key={movie.id}
              />
            ))
          ) : (
            <p className="text-center">No reviews found.</p>
          ) :<p className="text-center">Loading...</p> }
    
            <MDBBtn color="primary" onClick={getMoreData} className="btn-sm">
          Load More
        </MDBBtn>
        </div>

     
        {userId && (
          <div className="col-span-3 grid grid-cols-1 mt-8">
            <ProfileSpoilers profileId={userId} showToggles={false}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
