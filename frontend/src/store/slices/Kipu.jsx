import React, { useEffect } from "react";
import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./user/user.thunk.js";
import { useDispatch } from "react-redux";

function Kipu() {
  const dispatch = useDispatch();

  useEffect(() => {
    // const initialState = {
    //   isAuthenticated: false,
    // };
    // const userSlice = createSlice({
    //   name: "user",
    //   initialState,
    //   reducers: {
    //     Login: (state, action) => {
    //       console.log("hellow reducer");
    //     },
    //   },
    // });
    // console.log(userSlice);
  }, []);
  return (
    <div>
      kipu
      <button
        onClick={() => {
          dispatch(loginUserThunk());
        }}
        className="btn btn-primary"
      >
        Login
      </button>
    </div>
  );
}

export default Kipu;

// return rejectWithValue(err.response.data);
