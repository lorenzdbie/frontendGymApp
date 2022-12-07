import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./contexts/Theme.context.jsx";
import  MyAuth0Provider  from "./contexts/MyAuth0Provider.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MyAuth0Provider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </MyAuth0Provider>
  </React.StrictMode>
);
