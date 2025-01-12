"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  token: typeof window !== undefined ? localStorage.getItem("token") : "" ,
  user: typeof window !== undefined ? localStorage.getItem("user") : {},
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", action.payload.token);
      }
    },
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string, user: string }>) => {
      // console.log('action.payload.user = ', action.payload.user)
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user)); 
      }
    },
    userLoggedOut: (state) => {
      console.log("removing tokens from local storage")
      state.token = "";
      state.user = "";
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer