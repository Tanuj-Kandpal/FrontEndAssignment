import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import store from "../Store/store.jsx";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import DetailsPage from "../Pages/DetailsPage.jsx";
import HomePage from "../Pages/HomePage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Details" element={<DetailsPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
