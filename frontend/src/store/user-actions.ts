import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axios";

export const signIn = createAsyncThunk(
  "signIn",
  async (credentialResponse: { credential: string }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        token: credentialResponse.credential,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating the card:", error);
      throw error;
    }
  }
);

export const signInB = createAsyncThunk(
  "signInB",
  async () => {
    try {
      const response = await axiosInstance.post("/auth/login")
      return response.data;
    } catch (error) {
      console.error("Error creating the card:", error);
      throw error;
    }
  }
);

export const checkSession = createAsyncThunk("checkSession", async () => {
  try {
    const response = await axiosInstance.get("/auth/verify-session");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
