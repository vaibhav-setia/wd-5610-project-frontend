import axios from "axios";
export const getFollowStatus = async (followerId, followeeId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/follow/isFollowing/${followerId}/${followeeId}`
  );
  const isFollowing = response.data;
  return isFollowing;
};

export const follow = async (followerId, followeeId) => {
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/follow/follow`, {
    followerId: followerId,
    followeeId: followeeId,
  });
  return response.data;
};

export const unfollow = async (followerId, followeeId) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/follow/unfollow`,
    {
      followerId: followerId,
      followeeId: followeeId,
    }
  );
  return response.data;
};

export const getFollowers = async (userId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/follow/followers/${userId}`
  );
  return response.data;
};

export const getFollowing = async (userId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_API_BASE_URL}/follow/following/${userId}`
  );
  return response.data;
};
