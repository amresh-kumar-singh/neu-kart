import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/index.css";
import { AuthProvider } from "@/context/auth/Provider";
import { DataProvider } from "@/context/data/Provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
