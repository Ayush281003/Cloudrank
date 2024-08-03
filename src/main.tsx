import "./globals.css";

import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { AppStateProvider } from "./components/app-state-provider.tsx";
import { TailwindIndicator } from "./components/tailwind-indicator.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
    <TailwindIndicator />
  </React.StrictMode>
);
