import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import { AuthContextProvider } from "./context/authContext";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
