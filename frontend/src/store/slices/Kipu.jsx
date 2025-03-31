import React, { useEffect } from "react";
import { createSlice } from "@reduxjs/toolkit";

function Kipu() {
  useEffect(() => {
    const initialState = {
      isAuthenticated: false,
    };

    const userSlice = createSlice({
      name: "user",
      initialState,
      reducers: {
        Login: (state, action) => {
          console.log("hellow reducer");
        },
      },
    });

    console.log(userSlice);
  }, []);
  return <div>kipu</div>;
}

export default Kipu;
