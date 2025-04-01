import { useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeChanger } from "./components";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "./store/slices/user/user.thunk";
function App() {
  const dispatch = useDispatch();
  dispatch(loginUserThunk());
  return (
    <>
      {/* <ThemeChanger /> */}

      <Outlet />
    </>
  );
}

export default App;
