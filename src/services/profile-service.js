import axios from "axios";
export const getUser = async (userId) => {
  const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
  const user = response.data;
  return user;
};

export const updateUser = async (payload) => {
  const { token, profile } = payload;
  const response = await fetch(`http://localhost:3001/api/user`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: token },
    body: JSON.stringify(profile),
  });
  const responseUser = response.data;
  return responseUser;
};
