import Swal from "sweetalert2";
import Axios from "axios";
async function handleLogin(values, { setSubmitting }) {
    try {
        if (!values.email || !values.password) {
            Swal.fire("Error!", "Please fill all the fields", "error");
            return;
        } else if (!values.recaptcha) {
            Swal.fire("Error!", "Please complete the reCAPTCHA test", "error");
            return;
        }
        let response = await Axios.post("http://localhost:3000/Login", values, {
            withCredentials: true,
            validateStatus: () => true,
        });
        console.log(response);

        if (response.status == 200) {
            console.log(response.data);

            Swal.fire("Success!", "Logged in successfully", "success");
            // window.location.href = `/`;
            Navigate("/");
        } else if (response.status == 401) {
            Swal.fire("Error!", "Username or Password isn't correct", "error");
        } else if (response.status == 409) {
            Swal.fire("Error!", `${response.data.message} `, "error");
        } else if (response.status == 500) {
            Swal.fire("Error!", `Internal Server Error   `, "error");
        } else {
            Swal.fire("Error!", `Something Went Wrong ,`, "error");
        }
    } catch (error) {
        Swal.fire("Error!", `Something Went Wrong `, "error");
    } finally {
        setSubmitting(false);
    }
    // setSubmitting(false);
}
export default handleLogin;
