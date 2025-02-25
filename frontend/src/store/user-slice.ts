import { createSlice } from "@reduxjs/toolkit";
import { signIn, signInB, checkSession } from "./user-actions";

export type UserType = {
  id: number;
  email: string;
  accessToken:string;
  isSignedIn: boolean;
  status: string;
  error: string;
};

const initialState: UserType = {
  id: 0,
  email: "",
  accessToken:'',
  isSignedIn: false,
  status: "",
  error: "",
};

export const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    signout: (state) => {
      state.id = 0;
      state.email = "";
      state.isSignedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get User
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;
        state.id = action.payload.userInfo.id;
        state.isSignedIn = true;
        state.email = action.payload.userInfo.email;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed sign user";
      })
      //Get User B
      .addCase(signInB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;
        state.id = action.payload.userInfo.id;
        state.isSignedIn = true;
        state.email = action.payload.userInfo.email;
      })
      .addCase(signInB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed sign user";
      })
      // checkSession
      .addCase(checkSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "succeeded";
          state.id = action.payload.user.id;
          state.isSignedIn = action.payload.authenticated;
          state.email = action.payload.user.email;
        }
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed sign user";
      });
  },
});

export const { signout } = userSlice.actions;
