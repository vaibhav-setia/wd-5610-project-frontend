import NavBar from "../nav";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchBox from "./searchbox";
import ReviewCard from "./reviewcard";
import { ProfileSpoilers } from "../profile/profile-spoilers";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const getAllReviews = async (count) => {
    const url = `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/review/getAllReviews?limit=3&pageNo=`+count;
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
  let [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  let [modifiedId, setModifiedId] = useState(null);
  useEffect(() => {
    getAllReviews(pageCount).then((response) => {
      setData(response.data);
      setTotalCount(response.totalCount);
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

      <div className="grid grid-cols-8" id="scrollableDiv" style={{ height: "100%", overflowY: "scroll" }} >
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
          <InfiniteScroll
     dataLength={data.length}
     next={() => {
      getMoreData();
     }}
     hasMore={data.length < totalCount}
     loader={<h4>Loading...</h4>}
     endMessage={
      " "
     }

   >
    
       {
        Object.keys(data).length ? (
          data.map((movie) => (
            <ReviewCard
              movie={movie}
              data={data}
              setData={setData}
              key={movie.id}
              totalCount={totalCount}
              setTotalCount={setTotalCount}
              modifiedId={modifiedId}
              setModifiedId={setModifiedId}
            />
          ))
        ) : (
          "No reviews found.")
       }
    
   </InfiniteScroll>
        </div>

     
        {userId && (
          <div className="col-span-3 grid grid-cols-1 mt-8">
            <ProfileSpoilers profileId={userId} showToggles={false} slice={true} modifiedId={modifiedId}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
