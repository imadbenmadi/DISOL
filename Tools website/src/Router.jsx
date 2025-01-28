import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import Default from "./Default";

import Not_Found from "./Components/Not_Found";
import Not_Finished from "./Components/Not_Finished";
import ErrorElement from "./Components/ErrorElement";

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
        ],
    },
    {
        path: "/Login",
        element: <Login />,
        errorElement: <ErrorElement />,
    },
    {
        path: "/Register",
        element: <Register />,
        errorElement: <ErrorElement />,
    },
    {
        path: "/Register",
        element: <Login />,
        errorElement: <ErrorElement />,
    },

    {
        path: "*",
        element: <Not_Found />,
    },
]);

export default routes;
