import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // React Icons for edit and delete
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // For form validation
import { Link } from "react-router-dom";

const Contact_informations = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contactInformations, setContactInformations] = useState({});

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
                    Swal.fire("Error", "Vous devez vous reconnecter", "error");
                    Navigate("/Login");
                    setError("Unauthorized");
                } else {
                    setError(
                        "Erreur lors de la récupération de contact information"
                    );
                }
            } catch (error) {
                setError("Erreur lors de la récupération de data");
                console.error(
                    "Erreur lors de la récupération de contact data",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchContactInformations();
    }, [Navigate]);

    if (loading)
        return (
            <div className=" w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    if (error)
        return (
            <div className=" w-full h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    return (
        <div className="max-w-4xl overflow-auto mx-auto p-8 bg-white rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-black_text">
                Contact Information
            </h2>
            <div>
                <div className=" flex flex-col gap-6 my-6">
                    {/* Basic Info */}

                    <div className="max-w-3xl overflow-auto mx-auto p-6 bg-white shadow-lg rounded-lg">
                        <table className="min-w-full">
                            <tbody>
                                <tr className="border-t">
                                    <td className="py-3 px-6 text-gray-600 font-medium">
                                        Phone:
                                    </td>
                                    <td className="py-3 px-6 text-gray-600">
                                        {contactInformations?.phone ||
                                            "Not available"}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="py-3 px-6 text-gray-600 font-medium">
                                        Email:
                                    </td>
                                    <td className="py-3 px-6 text-gray-600">
                                        {contactInformations?.email ||
                                            "Not available"}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="py-3 px-6 text-gray-600 font-medium">
                                        Instagram:
                                    </td>
                                    <td className="py-3 px-6 text-gray-600">
                                        {contactInformations?.instagram ||
                                            "Not available"}
                                    </td>
                                </tr>
                                <tr className="border-t">
                                    <td className="py-3 px-6 text-gray-600 font-medium">
                                        Facebook:
                                    </td>
                                    <td className="py-3 px-6 text-gray-600">
                                        {contactInformations?.facebook ||
                                            "Not available"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Follow/Unfollow Button */}
                <div className="flex space-x-4">
                    <Link
                        to={"/Contact_informations/Edit"}
                        className=" py-2 px-3 rounded-md mx-auto w-fit bg-green-500 text-white"
                    >
                        Modifier
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Contact_informations;
