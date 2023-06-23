import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUser,
  updateUser,
  getAllReviewsForUser,
} from "./profile-service.js";

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

export const getAllReviewsForUserThunk = createAsyncThunk(
  "user/getAllReviewsForUser",
  async (userId) => {
    return await getAllReviewsForUser(userId);
  }
);
