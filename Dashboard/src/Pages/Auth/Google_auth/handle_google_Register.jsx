// Code to handle Google authentication
import Swal from "sweetalert2";

export const handle_google_Register = async (response, Navigate) => {
    const token = response.credential; // Use response.credential for the ID token
    const userType = "user"; // Default user type for Google Register

    // Send token and userType to backend for verification
    try {
        const res = await fetch("http://localhost:3000/google-auth-Register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, userType }), // Include userType in the request
        });

        const data = await res.json();
        console.log("response form google auth", data);

        if (res.status === 200) {
            Swal.fire({
                icon: "success",
                title: "Register Successful",
                text: "You have successfully logged in with Google!",
            });
            // window.location.href = `/`;
            Navigate("/");
        } else if (res.status === 422) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User already exists. Please Register using your email and password.",
            });
        } else if (res.status === 401) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Google token. Please try again.",
            });
        } else {
            // throw new Error(
            //     data.message || "Failed to authenticate with Google"
            // );
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to authenticate with Google. Please try again.",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while logging in with Google. Please try again.",
        });
    }
};
