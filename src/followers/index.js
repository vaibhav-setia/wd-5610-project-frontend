import React, { useState, useEffect } from "react";
import NavBar from "../nav";
import { useDispatch } from "react-redux";
import FollowerCard from "./follower-list-item";
import { useParams } from "react-router";
import { getFollowersThunk, getFollowingThunk } from "../services/follow-thunk";

function FollowersList({ title = "Followers" }) {
  let { userId } = useParams();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getFollowers() {
      const { payload } = await dispatch(getFollowersThunk(userId));
      setData(payload.data);
    }

    async function getFollowing() {
      const { payload } = await dispatch(getFollowingThunk(userId));
      setData(payload.data);
    }

    if (title === "Followers") getFollowers();
    else getFollowing();
  }, [userId]);

  return (
    <div>
      <NavBar />

      <div className="grid grid-cols-1 gap-4 mt-8">
        <div className=" py-8">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-blue-500 text-4xl font-bold text-center animate-fade-in">
              {title}
            </h1>
          </div>
        </div>

        {Object.keys(data).length ? (
          data.map((follow) => (
            <FollowerCard follow={follow} key={follow._id} />
          ))
        ) : (
          <p className="text-center">Wow such empty :)</p>
        )}
      </div>
    </div>
  );
}

export default FollowersList;
