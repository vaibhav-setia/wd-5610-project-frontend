import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReviewCard from "../home/reviewcard";
import { getAllReviewsForUserThunk } from "../services/profile-thunk";

function ProfileSpoilers({ profileId = "" }) {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchReviews() {
      const { payload } = await dispatch(getAllReviewsForUserThunk(profileId));
      setData(payload.data);
      setLoading(true);
    }

    fetchReviews();
  }, [profileId]);
  return (
    <div>
      <h2 className="ms-5 mb-5">Your spoilers</h2>
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
    </div>
  );
}

export { ProfileSpoilers };
