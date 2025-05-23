import { createRoot } from "react-dom/client";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { HomePage, LoginPage, SignUpPage } from "./pages";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
// import Kipu from "./store/slices/Kipu.jsx";
// import LoadingScreen from "./components/common/LoadingScreen.jsx";
import { Protected } from "./components";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            path=""
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          />
          <Route
            path="login"
            element={
              <Protected authentication={false}>
                <LoginPage />
              </Protected>
            }
          />
          <Route
            path="signup"
            element={
              <Protected authentication={false}>
                <SignUpPage />
              </Protected>
            }
          />
          {/* <Route path="kipu" element={<LoadingScreen />} /> */}
        </Route>
        <Route
          path="*"
          element={<h1 className="text-4xl text-red-400">404 not found</h1>}
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);
