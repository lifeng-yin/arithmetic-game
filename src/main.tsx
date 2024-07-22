import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";
import { Theme } from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Theme
    accentColor="blue"
    grayColor="sand"
    radius="none"
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Theme>,
);
