import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Dasboard/Statistics");
    }, []);
}
export default Default;
