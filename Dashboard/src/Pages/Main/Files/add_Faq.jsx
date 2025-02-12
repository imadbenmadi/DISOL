import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // React Icons for edit and delete
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
const Add_Faq = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contactInformations, setContactInformations] = useState({});
    const [editLoading, setEditLoading] = useState(false);
    // Fetch FAQ on load

    const handleEditSubmit = async (values) => {
        setEditLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/Admin/Faqs`,
                values,
                { withCredentials: true }
            );

            if (response.status == 200) {
                Swal.fire("Success", "FAQ mis à jour avec succès", "success");
                Navigate("/Faq");
            } else {
                Swal.fire("Error", "Failed to update FAQ", "error");
            }
        } catch (err) {
            Swal.fire("Error", "Erreur réseau, veuillez réessayer", "error");
        } finally {
            setEditLoading(false);
        }
    };

    return (
        <div className="max-w-3xl overflow-auto mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center  text-yallow_v">
                Ajouter un FaQ
            </h2>
            <Formik
                initialValues={{
                    qst: "",
                    sol: "",
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.qst) {
                        errors.qst = "quation is required";
                    }
                    if (!values.sol) {
                        errors.sol = "réponse is required";
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
                                    htmlFor="qst"
                                    className="block text-gray-700 font-medium"
                                >
                                    quation
                                </label>
                                <Field
                                    id="qst"
                                    name="qst"
                                    className="mt-1 p-2 border rounded-md w-full"
                                    type="text"
                                    placeholder="quation"
                                />
                                <ErrorMessage
                                    name="qst"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="sol"
                                    className="block text-gray-700 font-medium"
                                >
                                    réponse
                                </label>

                                <Field
                                    id="sol"
                                    name="sol"
                                    className="mt-1 p-2 border rounded-md w-full"
                                    type="sol"
                                    placeholder="reponse"
                                />
                                <ErrorMessage
                                    name="sol"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
                                >
                                    {editLoading
                                        ? "Sauvegarde..."
                                        : "Sauvegarder"}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Add_Faq;
