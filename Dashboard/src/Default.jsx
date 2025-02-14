import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "./AppContext";

function Default() {
    const { isAuth, userType, userId } = useAppContext();
    const Navigate = useNavigate();
    useEffect(() => {
        if (isAuth && userType && userId) {
            Navigate("/Main");
            return;
        }
        Navigate("/Login", { replace: true });
    }, []);
}
export default Default;
