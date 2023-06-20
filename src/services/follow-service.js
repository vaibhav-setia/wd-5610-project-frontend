import axios from "axios";
export const getFollowStatus = async (followerId, followeeId) => {
  const response = await axios.get(
    `http://localhost:3001/api/follow/isFollowing/${followerId}/${followeeId}`
  );
  const isFollowing = response.data;
  return isFollowing;
};

export const follow = async (followerId, followeeId) => {
  const response = await axios.post("http://localhost:3001/api/follow/follow", {
    followerId: followerId,
    followeeId: followeeId,
  });
  return response.data;
};
