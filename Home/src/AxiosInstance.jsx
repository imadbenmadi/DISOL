import axios from "axios";

// Set the base URL for all requests
axios.defaults.baseURL = "http://localhost:3000/"; // Replace with your API URL

// Add a response interceptor
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // Redirect to login page when user is unauthorized
            window.location.href = "/Login"; // Or use your router's navigation
        }
        return Promise.reject(error);
    }
);

export default axios; // Export the global axios
