import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "./AppContext";

function Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Main/Home_Overview", { replace: true });
    }, []);
}
export default Default;
