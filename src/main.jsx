import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './AuthProvider';
import { createBrowserRouter } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./supabase";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <SessionContextProvider supabaseClient={supabase}>
    <RouterProvider router={router} />
  </SessionContextProvider>
);
