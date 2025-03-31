import { useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeChanger } from "./components";
import { useSelector } from "react-redux";
function App() {
  return (
    <>
      <ThemeChanger />
      {/* <Kipu /> */}
      <h1 className="text-blue-500">navigation ............... </h1>

      <Outlet />
    </>
  );
}

export default App;
