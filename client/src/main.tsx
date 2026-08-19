// React Application Entry Point
// Mounts the App component to the DOM
// Uses StrictMode for development warnings

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";

// Create root element and render app
// StrictMode enables additional development checks
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
