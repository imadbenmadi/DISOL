import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // React Icons for edit and delete
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
const Edit_Contact_informations = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contactInformations, setContactInformations] = useState({});
    const [editLoading, setEditLoading] = useState(false);

    // Fetch contact information on load
    useEffect(() => {
        setLoading(true);
        const fetchContactInformations = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Contact_informations`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setContactInformations(
                        response.data.contact_informations[0]
                    );
                } else if (response.status === 401) {
                    Swal.fire("Error", "Accès non autorisé", "error");
                    Navigate("/login");
                } else {
                    // Swal.fire(
                    //     "Error",
                    //     "Failed to fetch contact information",
                    //     "error"
                    // );
                }
            } catch (err) {
                setError(true);
                Swal.fire(
                    "Error",
                    "Erreur réseau, veuillez réessayer",
                    "error"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchContactInformations();
    }, [Navigate]);

    const handleEditSubmit = async (values) => {
        setEditLoading(true);
        try {
            const response = await axios.put(
                `http://localhost:3000/Admin/Contact_informations`,
                values,
                { withCredentials: true }
            );

            if (response.status == 200) {
                Swal.fire(
                    "Success",
                    "Les coordonnées ont été mises à jour avec succès",
                    "success"
                );
                setContactInformations(values);
            } else {
                Swal.fire(
                    "Error",
                    "Impossible de mettre à jour les informations de contact",
                    "error"
                );
            }
        } catch (err) {
            Swal.fire("Error", "Erreur réseau, veuillez réessayer", "error");
        } finally {
            setEditLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="text-red-600 font-semibold">
                        Impossible de mettre à jour les informations de contact{" "}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl overflow-auto mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center text-black_text">
                Modifier les informations de contact{" "}
            </h2>
            <Formik
                initialValues={{
                    phone: contactInformations?.phone || "",
                    email: contactInformations?.email || "",
                    instagram: contactInformations?.instagram || "",
                    facebook: contactInformations?.facebook || "",
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.phone) {
                        errors.phone = "Phone is required";
                    }
                    if (!values.email) {
                        errors.email = "email is required";
                    }
                    return errors;
                }}
                onSubmit={handleEditSubmit}
            >
                {({ values }) => (
                    <Form>
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-gray-700 font-medium"
                                >
                                    Phone
                                </label>
                                <Field
                                    id="phone"
                                    name="phone"
                                    className="mt-1 p-2 border rounded-md w-full"
                                    type="text"
                                    placeholder="Enter phone number"
                                />
                                <ErrorMessage
                                    name="phone"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                                <div className="mt-1 text-sm text-gray-500">
                                    {"Current phone number: " +
                                        contactInformations?.phone}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 font-medium"
                                >
                                    Email
                                </label>
                                <Field
                                    id="email"
                                    name="email"
                                    className="mt-1 p-2 border rounded-md w-full"
                                    type="email"
                                    placeholder="email address"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                                <div className="mt-1 text-sm text-gray-500">
                                    {"Current email: " +
                                        contactInformations?.email}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="instagram"
                                    className="block text-gray-700 font-medium"
                                >
                                    Instagram
                                </label>
                                <Field
                                    id="instagram"
                                    name="instagram"
                                    className="mt-1 p-2 border rounded-md w-full"
                                    type="text"
                                    placeholder="Enter Instagram handle"
                                />
                                <div className="mt-1 text-sm text-gray-500">
                                    {"Current Instagram: " +
                                        contactInformations?.instagram}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="facebook"
                                    className="block text-gray-700 font-medium"
                                >
                                    Facebook
                                </label>
                                <Field
                                    id="facebook"
                                    name="facebook"
                                    className="mt-1 p-2 border rounded-md w-full"
                                    type="text"
                                    placeholder="Enter Facebook handle"
                                />
                                <div className="mt-1 text-sm text-gray-500">
                                    {"Current Facebook: " +
                                        contactInformations?.facebook}
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
                                >
                                    {editLoading
                                        ? "Sauvegarde..."
                                        : "Sauvegarder Changes"}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Edit_Contact_informations;
