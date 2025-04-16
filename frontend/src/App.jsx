import { useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeChanger } from "./components";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "./store/slices/user/user.thunk";
import toast, { Toaster } from "react-hot-toast";

function App() {
  // const dispatch = useDispatch();
  // dispatch(loginUserThunk());
  return (
    <>
      <Toaster position="top-center" />

      {/* <ThemeChanger /> */}

      <Outlet />
    </>
  );
}

export default App;
