import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, updateUser } from "./profile-service.js";

export const getUserThunk = createAsyncThunk(
  "user/getUser",
  async (userId) => await getUser(userId)
);

export const updateUserThunk = createAsyncThunk(
  "user/updateUser",
  async (payload) => {
    await updateUser(payload);
  }
);
