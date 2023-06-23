import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReviewCard from "../home/reviewcard";
import { getAllReviewsForUserThunk } from "../services/profile-thunk";

function ProfileSpoilers({ profileId = "" }) {
  let [data, setData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchReviews() {
      const { payload } = await dispatch(getAllReviewsForUserThunk(profileId));
      setData(payload.data);
    }

    fetchReviews();
  }, [profileId]);
  return (
    <div>
         <div className=" py-8">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-blue-500 text-4xl font-bold text-center animate-fade-in">
              Your spoilers
              </h1>
            </div>
          </div>
      {Object.keys(data).length ? (
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
      )}
    </div>
  );
}

export { ProfileSpoilers };
