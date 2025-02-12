import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import Default from "./Default";

import Main from "./Pages/Main/Main";
import Home_Overview from "./Pages/Main/Home_Overview";
import Default_Main from "./Pages/Main/Default";
import Main_Files from "./Pages/Main/Files/Files";

import Not_Found from "./Components/Not_Found";
import Not_Finished from "./Components/Not_Finished";
import ErrorElement from "./Components/ErrorElement";
import ProtectedRoute from "./ProtectedRoute";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorElement />,
        children: [
            {
                index: true,
                element: <Default />,
                errorElement: <ErrorElement />,
            },
            {
                element: <ProtectedRoute />, // This protects all child routes
                children: [
                    {
                        path: "/Main",
                        element: <Main />,
                        caseSensitive: true,
                        children: [
                            {
                                index: true,
                                element: <Default_Main />,
                            },
                            {
                                path: "/Main/Home_Overview",
                                caseSensitive: true,
                                element: <Home_Overview />,
                            },
                            {
                                path: "/Main/Files",
                                caseSensitive: true,
                                elaement: <Main_Files />,
                            },
                        ],
                    },
                ],
            },
        ],
    },

    {
        path: "/Login",
        element: <Login />,
        caseSensitive: true,
        errorElement: <ErrorElement />,
    },
    {
        path: "/Register",
        element: <Register />,
        caseSensitive: true,
        errorElement: <ErrorElement />,
    },
    {
        path: "/Register",
        element: <Login />,
        caseSensitive: true,
        errorElement: <ErrorElement />,
    },

    {
        path: "*",
        element: <Not_Found />,
    },
]);

export default routes;
