import Swal from "sweetalert2";
import Axios from "axios";
async function handleRegister(values, Navigate, { setSubmitting }) {
    try {
        if (
            !values.email ||
            !values.password ||
            !values.firstName ||
            !values.lastName
        ) {
            Swal.fire("Error!", "Please fill all the fields", "error");
            return;
        } else if (!values.recaptcha) {
            Swal.fire("Error!", "Please complete the reCAPTCHA test", "error");
            return;
        }
        let response = await Axios.post(
            "http://localhost:3000/Register",
            values,
            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );
        console.log(response);

        if (response.status == 200) {
            try {
                let Login_response = await Axios.post(
                    "http://localhost:3000/Login",
                    values,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (Login_response.status == 200) {
                    Swal.fire("Success!", "Logged in successfully", "success");
                    // window.location.href = "/";
                    Navigate("/");
                } else {
                    // window.location.href = "/Login";
                    Navigate("/Login");
                }
            } catch (error) {
                // window.location.href = "/Login";
                Navigate("/Login");
            }
        } else if (response.status == 400) {
            setSubmitting(false);
            Swal.fire("Error", `${response.data.message} `, "error");
        } else if (response.status == 409) {
            setSubmitting(false);
            Swal.fire("Error!", `${response.data.message} `, "error");
        } else if (response.status == 500) {
            setSubmitting(false);
            Swal.fire("Error!", `Internal Server Error   `, "error");
        } else {
            setSubmitting(false);
            Swal.fire(
                "Error!",
                `Something Went Wrong ,please trye again latter, ${response.data.message} `,
                "error"
            );
        }
    } catch (error) {
        setSubmitting(false);
        Swal.fire(
            "Error!",
            `Something Went Wrong ,please trye again latter`,
            "error"
        );
    }

    // setSubmitting(false);
}
export default handleRegister;
