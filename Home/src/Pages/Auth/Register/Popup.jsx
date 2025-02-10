import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import ReCAPTCHA from "react-google-recaptcha";
import Google_auth_data from "../../../google-auth.json";
import Swal from "sweetalert2";
import handleRegister from "./Post_Register";
import { handle_google_Register } from "../Google_auth/handle_google_Register";

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
        const recaptchaValue = recaptchaRef.current?.getValue();
        if (!recaptchaValue) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please complete the reCAPTCHA.",
            });
            setSubmitting(false);
            return;
        }
        values.recaptcha = recaptchaValue;
        await handleRegister(values, Navigate, { setSubmitting });
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col items-center p-6">
                <div className="w-full text-black_text">
                    <div className="pb-4">
                        <div className="text-3xl font-semibold">
                            Create an account
                        </div>
                        <div>Let’s get started on your freelance journey.</div>
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

                    {/* Registration Form */}
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
                            } else if (values.firstName.length < 3) {
                                errors.firstName = "At least 3 chars";
                            } else if (values.firstName.length > 30) {
                                errors.firstName = "At most 30 chars";
                            }
                            if (!values.lastName) {
                                errors.lastName = "Last Name is Required";
                            } else if (values.lastName.length < 3) {
                                errors.lastName = "At least 3 chars";
                            } else if (values.lastName.length > 30) {
                                errors.lastName = "At most 30 chars";
                            }
                            if (!values.email) {
                                errors.email = "Email is Required";
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    values.email
                                )
                            ) {
                                errors.email = "Invalid email address";
                            }
                            if (!values.password) {
                                errors.password = "Password is Required";
                            } else if (values.password.length < 8) {
                                errors.password =
                                    "Password must be at least 8 characters long";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values, Navigate, { setSubmitting });
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col text-sm md:text-lg gap-4 text-black_text">
                                <div className="flex flex-col md:flex-row gap-4 w-full">
                                    <div className="w-full md:w-1/2 relative">
                                        <div className="font-semibold text-sm pb-1">
                                            First Name
                                        </div>
                                        <Field
                                            placeholder="Prénom"
                                            type="text"
                                            name="firstName"
                                            disabled={isSubmitting}
                                            className="w-full border border-gray_white px-4 py-2 rounded-lg text-sm"
                                        />
                                        <ErrorMessage
                                            name="firstName"
                                            component="div"
                                            style={names_errorInputMessage}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 relative">
                                        <div className="font-semibold text-sm pb-1">
                                            Last Name
                                        </div>
                                        <Field
                                            placeholder="Nom de famille"
                                            type="text"
                                            name="lastName"
                                            disabled={isSubmitting}
                                            className="w-full border border-gray_white px-4 py-2 rounded-lg text-sm"
                                        />
                                        <ErrorMessage
                                            name="lastName"
                                            component="div"
                                            style={names_errorInputMessage}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="font-semibold text-sm pb-1">
                                        Email
                                    </div>
                                    <Field
                                        placeholder="example@gmail.com"
                                        type="email"
                                        name="email"
                                        disabled={isSubmitting}
                                        className="w-full border border-gray_white px-4 py-2 rounded-lg text-sm"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>

                                <div>
                                    <div className="font-semibold text-sm pb-1">
                                        Password
                                    </div>
                                    <Field
                                        placeholder="•••••••••••••••••••"
                                        type="password"
                                        name="password"
                                        disabled={isSubmitting}
                                        className="w-full border border-gray_white px-4 py-2 rounded-lg text-sm"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>

                                {/* reCAPTCHA */}
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={Google_auth_data.CAPATCHA_SITE_KEY}
                                />

                                {isSubmitting ? (
                                    <span className="small-loader my-5 m-auto"></span>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-perpol_v py-2 mt-4 rounded-2xl text-white font-semibold"
                                        disabled={isSubmitting}
                                    >
                                        Get Started
                                    </button>
                                )}
                            </Form>
                        )}
                    </Formik>

                    {/* Sign In Link */}
                    <div className="pt-6 text-sm font-semibold text-gray_v text-center">
                        Already have an account?{" "}
                        <Link to="/Login" className="underline text-perpol_v">
                            Sign in
                        </Link>
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
