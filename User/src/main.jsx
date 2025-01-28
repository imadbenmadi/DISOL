import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Router from "./Router";
import { RouterProvider } from "react-router";
import { AppProvider } from "./AppContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google_auth_data from "./google-auth.json";

const { client_id } = Google_auth_data.web;

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={client_id}>
        <React.StrictMode>
            <AppProvider>
                <RouterProvider router={Router} />
            </AppProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);
