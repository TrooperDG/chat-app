import { useEffect, useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  getUserThunk,
} from "./store/slices/user/user.thunk";
import { Toaster } from "react-hot-toast";
import { setUISettings } from "./store/slices/settings/settings.silce";
import { LoadingScreen } from "./components/common";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const htmlElement = document.querySelector("html");
  const { themeSettings } = useSelector((state) => state.settingsReducer);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      await dispatch(getUserThunk());
      setLoading(false);
    };
    getUser();
  }, []);

  // setting the theme------------------
  useEffect(() => {
    htmlElement.setAttribute("data-theme", themeSettings.theme || "dark");
  }, [themeSettings.theme]);

  //* if the user changes the theme , immediately change it in the app
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function handleThemeChange(e) {
      if (e.matches) {
        htmlElement.setAttribute("data-theme", "dark");
      } else {
        htmlElement.setAttribute("data-theme", "light");
      }
    }

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  // checking if its mobile view---------------------------
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        dispatch(setUISettings({ isMobile: true }));
      } else {
        dispatch(setUISettings({ isMobile: false }));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  console.log("app");

  return (
    <>
      <Toaster position="top-center" />

      {/* <ThemeChanger /> */}

      <Outlet />
    </>
  );
}

export default App;
