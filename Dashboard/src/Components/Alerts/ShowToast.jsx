import React from "react";

function ShowToast(message, type = "success", setToast) {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
}

export default ShowToast;
