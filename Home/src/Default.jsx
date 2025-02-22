import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "./AppContext";
function Default() {
    const Navigate = useNavigate();

    useEffect(() => {
        Navigate("/Home");
    }, []);
    return <div>Redirecting...</div>;
}
export default Default;
