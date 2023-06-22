import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "./user-service";

export const loginThunk = createAsyncThunk(
    "api/login", async (credentials) => {
      const user = await userService.login(credentials);
      return user;
    }
);

