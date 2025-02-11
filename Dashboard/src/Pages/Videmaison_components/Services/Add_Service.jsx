import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function Add_Service() {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null); // For previewing the image

    const handleAdd_Service = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append("Title", values.Title);
        formData.append("Description", values.Description);
        formData.append("type", values.type);

        if (values.image) {
            formData.append("image", values.image);
        }

        try {
            const response = await axios.post(
                `http://localhost:3000/Admin/Services`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    validateStatus: () => true,
                }
            );

            if (response.status === 200) {
                Swal.fire("Success", "Service ajouté avec succès!", "success");
                navigate("/Services");
                resetForm();
                setImagePreview(null); // Reset the image preview
            } else {
                Swal.fire(
                    "Error",
                    response.data.message || "Impossible d'ajouter le service",
                    "error"
                );
            }
        } catch (error) {
            Swal.fire(
                "Error",
                "Une erreur inattendue s'est produite. Veuillez réessayer.",
                "error"
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleImageChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            setFieldValue("image", file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg py-12 px-8 bg-white shadow-lg rounded-lg text-center">
                <h2 className="text-3xl font-semibold mb-6 text-yallow_v">
                    Ajouter un nouveau Service{" "}
                </h2>

                <Formik
                    initialValues={{
                        Title: "",
                        Description: "",
                        type: "",
                        image: null,
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.Title)
                            errors.Title = "Service title is required";
                        if (!values.Description)
                            errors.Description =
                                "Service description is required";
                        if (!values.type)
                            errors.type = "Service type is required";
                        return errors;
                    }}
                    onSubmit={handleAdd_Service}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="flex flex-col gap-4">
                            <div>
                                <label className="font-semibold text-sm pb-1 text-gray-700">
                                    Titre de Service
                                </label>
                                <Field
                                    type="text"
                                    name="Title"
                                    placeholder="Enter the service title"
                                    disabled={isSubmitting}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="Title"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-sm pb-1 text-gray-700">
                                    type de Service
                                </label>
                                <Field
                                    type="text"
                                    name="type"
                                    placeholder="Enter the service type"
                                    disabled={isSubmitting}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="type"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-sm pb-1 text-gray-700">
                                    Description de Service
                                </label>
                                <Field
                                    as="textarea"
                                    name="Description"
                                    placeholder="Enter the service description"
                                    disabled={isSubmitting}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="Description"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>

                            <div>
                                <label className="font-semibold text-sm pb-1 text-gray-700">
                                    Image de Service
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageChange(e, setFieldValue)
                                    }
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="image"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>

                            {imagePreview && (
                                <div className="mt-4">
                                    <img
                                        loading="lazy"
                                        src={imagePreview}
                                        alt="Image Preview"
                                        className="w-fit h-48 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold mt-4 transition duration-200"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Adding..."
                                    : "Ajouter un Service"}
                            </button>

                            <Link
                                to="/Services"
                                className="text-blue-500 hover:underline mt-4 text-sm"
                            >
                                Retour à la liste des services{" "}
                            </Link>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

const errorInputMessage = {
    fontSize: "12px",
    color: "red",
    marginTop: "4px",
};

export default Add_Service;
