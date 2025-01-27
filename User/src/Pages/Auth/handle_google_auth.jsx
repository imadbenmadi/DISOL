// Code to handle Google authentication
import Swal from "sweetalert2";

export const handle_google_auth = async (response, Navigate) => {
    const token = response.credential; // Use response.credential for the ID token
    const userType = "user"; // Default user type for Google login

    // Send token and userType to backend for verification
    try {
        const res = await fetch("http://localhost:3000/google-auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, userType }), // Include userType in the request
        });

        const data = await res.json();

        if (res.status === 200) {
            console.log("JWT Token:", data.token);
            console.log("User Info:", data.user);
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "You have successfully logged in with Google!",
            });
            // window.location.href = `/`;
            Navigate("/");
        } else if (res.status === 401) {
            throw new Error("Invalid Google Token");
        } else {
            throw new Error(
                data.message || "Failed to authenticate with Google"
            );
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
