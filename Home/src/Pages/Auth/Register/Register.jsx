import Register_image from "../../../../public/Register.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import handleRegister from "./Post_Register";
import { handle_google_Register } from "../Google_auth/handle_google_Register";
import { GoogleLogin } from "@react-oauth/google";
import ReCAPTCHA from "react-google-recaptcha";
// import Google_auth_data from "../../../google-auth.json";
import Swal from "sweetalert2";
import { useRef } from "react";
function Register() {
    const Navigate = useNavigate();
    const recaptchaRef = useRef(); // Use ref for reCAPTCHA

    // Handle Google OAuth2 failure
    const handleFailure = (error) => {
        console.error("Google Login Error:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while logging in with Google. Please try again.",
        });
    };
    // Handle form submission with reCAPTCHA
    const handleSubmit = async (values, Navigate, { setSubmitting }) => {
        // Get reCAPTCHA value
        const recaptchaValue = recaptchaRef.current?.getValue();

        // If reCAPTCHA is not completed, show an error
        if (!recaptchaValue) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please complete the reCAPTCHA.",
            });
            setSubmitting(false);
            return;
        }

        // Add reCAPTCHA value to your login payload
        values.recaptcha = recaptchaValue;

        // Call your login function
        await handleRegister(values, Navigate, { setSubmitting });
    };
    return (
        <div className="flex justify-center items-center h-screen">
            {/* <div className=" w-1/2   hidden md:block   h-[calc(100vh)]">
                <img
                    src={Register_image}
                    alt="Login"
                    className=" w-full h-full object-contain "
                />
            </div> */}
            <div className="md:w-1/2 w-full h-screen  py-12 bg-white flex flex-col items-center justify-center ">
                <div className=" w-[80%] text-black_text">
                    <div className=" pb-4 pt-24 md:pt-0 ">
                        <div className=" text-3xl font-semibold ">
                            Create an account
                        </div>
                        <div>Let’s get started your freelance journey.</div>
                    </div>
                    {/* Google Login Button */}
                    <div className="w-fit mx-auto mb-4">
                        <GoogleLogin
                            onSuccess={(response) =>
                                handle_google_Register(response, Navigate)
                            }
                            onError={handleFailure}
                            size="medium"
                            text="continue_with"
                        />
                    </div>
                    <div>
                        <Formik
                            initialValues={{
                                userType: "user",
                                firstName: "",
                                lastName: "",
                                email: "",
                                password: "",
                            }}
                            validate={(values) => {
                                const errors = {};

                                if (!values.firstName) {
                                    errors.firstName = "First Name is Required";
                                } else if (values.firstName.length < 3)
                                    errors.firstName = " At least 3 chars";
                                else if (values.firstName.length > 30)
                                    errors.firstName = " At most 30 chars";
                                if (!values.lastName) {
                                    errors.lastName = "Last Name is Required";
                                } else if (values.lastName.length < 3)
                                    errors.lastName = " At least 3 chars";
                                else if (values.lastName.length > 30)
                                    errors.lastName = " At most 30 chars";
                                if (!values.email) {
                                    errors.email = "email is Required";
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                        values.email
                                    )
                                ) {
                                    errors.email = "Invalid email address";
                                }

                                // Validate password
                                if (!values.password) {
                                    errors.password = "password is Required";
                                } else if (values.password.length < 8) {
                                    errors.password =
                                        "password must be at least 8 characters long";
                                }

                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                // setSubmitting(false);
                                handleSubmit(values, Navigate, {
                                    setSubmitting,
                                });
                            }}
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form className="  flex flex-col text-sm md:text-lg  gap-4 text-black_text">
                                    <div className=" flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full pb-6 ">
                                        <div className="w-full  md:w-[50%]  relative">
                                            <div className="  font-semibold text-sm pb-1">
                                                First Name
                                            </div>
                                            <Field
                                                placeholder="Prénom"
                                                type="text"
                                                name="firstName"
                                                disabled={isSubmitting}
                                                className="w-full border border-gray_white px-4 py-2 rounded-lg  text-sm "
                                            />
                                            <ErrorMessage
                                                name="firstName"
                                                component="div"
                                                style={names_errorInputMessage}
                                            />
                                        </div>
                                        <div className="  w-full  md:w-[50%] relative">
                                            <div className="font-semibold text-sm pb-1">
                                                Last Name
                                            </div>
                                            <Field
                                                placeholder="Nom de famille"
                                                type="text"
                                                name="lastName"
                                                disabled={isSubmitting}
                                                className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                            />
                                            <ErrorMessage
                                                name="lastName"
                                                component="div"
                                                style={names_errorInputMessage}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className=" font-semibold text-sm pb-1">
                                            email{" "}
                                        </div>
                                        <Field
                                            placeholder="example@gmail.com"
                                            type="email"
                                            name="email"
                                            disabled={isSubmitting}
                                            className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            style={errorInputMessage}
                                        />
                                    </div>
                                    <div>
                                        <div className=" font-semibold text-sm pb-1">
                                            password{" "}
                                        </div>
                                        <div className=" flex items-center">
                                            <Field
                                                placeholder="•••••••••••••••••••"
                                                type="text"
                                                name="password"
                                                disabled={isSubmitting}
                                                className="border border-gray_white px-4 py-2  rounded-lg text-sm  w-full"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            style={errorInputMessage}
                                        />
                                    </div>

                                    {/* reCAPTCHA */}
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={
                                            Google_auth_data.CAPATCHA_SITE_KEY
                                        } // Replace with your reCAPTCHA site key
                                    />
                                    {isSubmitting ? (
                                        <span className="small-loader my-5  m-auto"></span>
                                    ) : (
                                        <button
                                            type="submit"
                                            className=" bg-perpol_v py-2 mt-4 rounded-2xl text-white font-semibold "
                                            disabled={isSubmitting}
                                        >
                                            Get Started
                                        </button>
                                    )}
                                </Form>
                            )}
                        </Formik>
                        <div className="pt-6 text-sm font-semibold text-gray_v text-center">
                            Already have an account?{" "}
                            <Link
                                to={"/Login"}
                                className=" underline text-perpol_v"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const errorInputMessage = {
    fontSize: "12px",
    color: "red",
};
const names_errorInputMessage = {
    position: "absolute",
    bottom: "-22px",
    left: "5px",
    fontSize: "12px",
    color: "red",
};
export default Register;
