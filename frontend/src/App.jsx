import { useEffect, useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeChanger } from "./components";
import { useDispatch } from "react-redux";
import {
  getOtherUsersThunk,
  getUserThunk,
} from "./store/slices/user/user.thunk";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      await dispatch(getUserThunk());
      await dispatch(getOtherUsersThunk());
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="bg-amber-800 h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      {/* <ThemeChanger /> */}

      <Outlet />
    </>
  );
}

export default App;
