import { createSlice } from "@reduxjs/toolkit";
import {loginThunk} from "./user-thunks";

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
  extraReducers: {
    [loginThunk.fulfilled]: (state, {payload}) => {
      state.login = true;
      state.accessToken = payload.data.jwtToken;
      state.id = payload.data.id;
      state.name = payload.data.name;
      state.email = payload.data.email;
      state.image_url = payload.data.picture;
      state.newUser = payload.data.newUser;
      state.user_type = payload.data.type;
    },
  },
  reducers: {
    // logInUser: (state, action) => {
    //   console.log("action.payload", action.payload);
    //   state.user.login = true;
    //   state.user.accessToken = action.payload.jwtToken;
    //   state.user.id = action.payload.id;
    //   state.user.name = action.payload.name;
    //   state.user.email = action.payload.email;
    //   state.user.image_url = action.payload.picture;
    //   state.user.newUser = action.payload.newUser;
    //   state.user.user_type = action.payload.type;
    // },
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
      state.user_type = action.payload;
    },
  },
});

export const { logInUser, logOutUser, setOldUser, setUserType } =
  userSlice.actions;

export const userLogin = (state) =>{ 
  console.log(state)
  return state.user.login;
}
export const userToken = (state) => state.user.accessToken;
export const userName = (state) => state.user.name;
export const userEmail = (state) => state.user.email;
export const userImage = (state) => state.user.image;
export const newUser = (state) => state.user.newUser;
export const userId = (state) => state.user.id;
export const userType = (state) => state.user.user_type;

export default userSlice.reducer;
