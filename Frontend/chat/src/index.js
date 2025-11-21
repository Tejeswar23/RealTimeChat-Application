import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/chat.css";
import App from "./app/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
