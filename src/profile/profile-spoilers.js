import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReviewCard from "../home/reviewcard";
import { getAllReviewsForUserThunk } from "../services/profile-thunk";
import InfiniteScroll from "react-infinite-scroll-component"; 

function ProfileSpoilers({ profileId = "" , showToggles=true, slice=false, spoilerCount=0, setSpoilerCount="", modifiedId=null}) {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(1000);
  const [pageNo, setPageNo] = useState(1);
  const limit = 3;
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchReviews() {
      let tlimit = limit
      if(slice)
        tlimit = 10000
      const tNo = pageNo;
      const { payload } = await dispatch(getAllReviewsForUserThunk({profileId, tNo,tlimit}));
      setTotalCount(payload.totalCount);
      if(slice)
        setData(payload.data.slice(0, 4));
      else
        setData(payload.data);
      setLoading(true);
    }
 
    fetchReviews();
  }, [profileId,modifiedId]);

  const getMoreData = async () => {
    setPageNo(pageNo+1);
    const tNo = pageNo+1;
    let tlimit = limit
    const { payload } = await dispatch(getAllReviewsForUserThunk({profileId,tNo,tlimit}));
    setData(data.concat(payload.data));
    
  };

  return (
    <div>
    
      <div className=" py-8">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-blue-500 text-4xl font-bold text-center animate-fade-in">
              Your recent spoilers
              </h1>
            </div>
          </div>
          {showToggles ?  <InfiniteScroll
     dataLength={data.length}
     next={() => {
      getMoreData();
     }}
     hasMore={data.length < totalCount}
     loader={<h4>Loading...</h4>}
     endMessage={
      " "
     }
 
   > : {loading ? Object.keys(data).length ? (
    data.map((movie) => (
      <ReviewCard
        movie={movie}
        data={data}
        setData={setData}
        key={movie.id}
        showToggles = {showToggles}
        spoilerCount={spoilerCount}
        setSpoilerCount={setSpoilerCount}
        
      />
    ))
  ) : (
    <p className="text-center">No reviews found.</p>
  ) :<p className="text-center">Loading...</p>}
  </InfiniteScroll>: ""}
  
      { !showToggles && (loading ? Object.keys(data).length ? (
        data.map((movie) => (
          <ReviewCard
            movie={movie}
            data={data}
            setData={setData}
            key={movie.id}
            showToggles = {showToggles}
            spoilerCount={spoilerCount}
            setSpoilerCount={setSpoilerCount}
            
          />
        ))
      ) : (
        <p className="text-center">No reviews found.</p>
      ) :<p className="text-center">Loading...</p>) }
    </div>
  );
}
 
export { ProfileSpoilers };
 
 