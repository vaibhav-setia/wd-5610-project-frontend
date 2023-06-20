import { createAsyncThunk } from "@reduxjs/toolkit";
import { follow, getFollowStatus, unfollow } from "./follow-service.js";

export const getFollowStatusThunk = createAsyncThunk(
  "follow/getFollowStatus",
  async ({ followerId, followeeId }) =>
    await getFollowStatus(followerId, followeeId)
);

export const followThunk = createAsyncThunk(
  "follow/follow",
  async ({ followerId, followeeId }) => await follow(followerId, followeeId)
);

export const unfollowThunk = createAsyncThunk(
  "follow/unfollow",
  async ({ followerId, followeeId }) => await unfollow(followerId, followeeId)
);
