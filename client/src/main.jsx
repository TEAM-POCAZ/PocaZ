import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Socket from "./network/socket";

const baseURL = import.meta.env.VITE_HOST_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
const socketTest = new Socket(baseURL);

root.render(<App socket={socketTest} />);
