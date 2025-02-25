import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import Default from "./Default";

import Main from "./Pages/Main/Main";
import Home_Overview from "./Pages/Main/Home_Overview";
import Default_Main from "./Pages/Main/Default";
import Main_Documents from "./Pages/Main/Documents/Documents";

import Main_Files from "./Pages/Main/Files/Files";
import Main_Add_File from "./Pages/Main/Files/Add_Files";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Dashboard_Default from "./Pages/Dashboard/Dashboard_Default";
import Dashboard_Statistics from "./Pages/Dashboard/Dashboard_Statistics";
import Dashboard_Team from "./Pages/Dashboard/Dashboard_Team";
import Dashboard_Admins from "./Pages/Dashboard/Dashboard_Admins";
import Dashboard_Users from "./Pages/Dashboard/Dashboard_Users";
import Dashboard_Settings from "./Pages/Dashboard/Dashboard_Settings";
import Dashboard_Reports from "./Pages/Dashboard/Dashboard_Reports";
import Dashboard_Logger from "./Pages/Dashboard/Dashboard_Logger";

import Not_Found from "./Components/Not_Found";
import Not_Finished from "./Components/Not_Finished";
import ErrorElement from "./Components/ErrorElement";
import ProtectedRoute from "./middlewares/ProtectedRoute";
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
                                path: "/Main/Documents",
                                caseSensitive: true,
                                element: <Main_Documents />,
                            },
                            {
                                path: "/Main/Files",
                                caseSensitive: true,
                                element: <Main_Files />,
                            },
                            {
                                path: "/Main/Files/Add",
                                caseSensitive: true,
                                element: <Main_Add_File />,
                            },
                            // {
                            //     path: "/Main/Documents/Add",
                            //     caseSensitive: true,
                            //     element: <Main_Add_Document />,
                            // },
                        ],
                    },
                    {
                        path: "/Dashboard",
                        element: <Dashboard />,
                        caseSensitive: true,
                        children: [
                            {
                                index: true,
                                element: <Dashboard_Default />,
                            },
                            {
                                path: "/Dashboard/Statistics",
                                caseSensitive: true,
                                element: <Dashboard_Statistics />,
                            },
                            {
                                path: "/Dashboard/Team",
                                caseSensitive: true,
                                element: <Dashboard_Team />,
                            },
                            {
                                path: "/Dashboard/Admins",
                                caseSensitive: true,
                                element: <Dashboard_Admins />,
                            },
                            {
                                path: "/Dashboard/Users",
                                caseSensitive: true,
                                element: <Dashboard_Users />,
                            },
                            {
                                path: "/Dashboard/Settings",
                                caseSensitive: true,
                                element: <Dashboard_Settings />,
                            },
                            {
                                path: "/Dashboard/Reports",
                                caseSensitive: true,
                                element: <Dashboard_Reports />,
                            },
                            {
                                path: "/Dashboard/Logger",
                                caseSensitive: true,
                                element: <Dashboard_Logger />,
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
