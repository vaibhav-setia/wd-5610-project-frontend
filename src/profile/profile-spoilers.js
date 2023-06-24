import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReviewCard from "../home/reviewcard";
import { getAllReviewsForUserThunk } from "../services/profile-thunk";

function ProfileSpoilers({ profileId = "" , showToggles=true, slice=false}) {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchReviews() {
      const { payload } = await dispatch(getAllReviewsForUserThunk(profileId));
      if(slice)
        setData(payload.data.slice(0, 4));
      else
        setData(payload.data);
      setLoading(true);
    }

    fetchReviews();
  }, [profileId]);
  return (
    <div>
     
      <div className=" py-8">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-blue-500 text-4xl font-bold text-center animate-fade-in">
              Your recent spoilers
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
            showToggles = {showToggles}
          />
        ))
      ) : (
        <p className="text-center">No reviews found.</p>
      ) :<p className="text-center">Loading...</p> }
    </div>
  );
}

export { ProfileSpoilers };
