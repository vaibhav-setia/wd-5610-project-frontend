import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  accessToken: null,
  id: null,
  name: "",
  email: "",
  image_url: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser: (state, action) => {
      console.log("action.payload", action.payload);
      state.login = true;
      state.accessToken = action.payload.jwtToken;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image_url = action.payload.picture;
      state.newUser = action.payload.newUser;
      state.user_type = action.payload.type;
    },
    logOutUser: (state, action) => {
      state.login = false;
      state.accessToken = null;
      state.id = null;
      state.name = "";
      state.email = "";
      state.image_url = "";
      state.user_type = "";
    },
    setOldUser: (state, action) => {
      state.newUser = false;
    },
    setUserType: (state, action) => {
      console.log(action);
      state.user_type = action.payload;
    },
  },
});

export const { logInUser, logOutUser, setOldUser, setUserType } =
  userSlice.actions;

export const userLogin = (state) => state.user.login;
export const userToken = (state) => state.user.accessToken;
export const userName = (state) => state.user.name;
export const userEmail = (state) => state.user.email;
export const userImage = (state) => state.user.image;
export const newUser = (state) => state.user.newUser;
export const userId = (state) => state.user.id;
export const userType = (state) => state.user.user_type;
export default userSlice.reducer;
