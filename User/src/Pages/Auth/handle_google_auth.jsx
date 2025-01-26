// Code to handle Google authentication
import Swal from "sweetalert2";
import axios from "axios";

export const handle_google_login = async (response) => {
    const token = response.credential; // Use response.credential for the ID token

    // Send token to backend for verification
    try {
        const res = await fetch("http://localhost:3000/google-auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
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
