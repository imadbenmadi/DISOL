import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Default from "./Default";

import Home from "./Pages/Home/Home";

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
            {
                path: "/Home",
                element: <Home />,
            },
        ],
    },

    {
        path: "*",
        element: <Not_Found />,
    },
]);

export default routes;
