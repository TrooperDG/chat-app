import { useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <h1 className="text-blue-500">hello </h1>
      <button className="btn btn-accent btn-outline">Three</button>
      <Outlet />
    </>
  );
}

export default App;
