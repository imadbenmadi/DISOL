import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Main/Home_Overview");
    }, []);
}
export default Default;
