import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<h1>This is Home</h1>} />
        <Route path="/login" element={<h1>This is Login</h1>} />
        <Route path="/signup" element={<h1>This is SIgnUp</h1>} />
      </Route>
      <Route path="*" element={<h1>404 not found</h1>} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
