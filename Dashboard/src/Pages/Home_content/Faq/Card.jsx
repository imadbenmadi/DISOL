import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function Card({ faq, Faqs, setFaqs }) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // To toggle FAQ visibility (question/réponse)

    const handle_Delete_Faq = async () => {
        setDeleteLoading(true);
        try {
            const response = await axios.delete(
                `http://localhost:3000/Admin/Faqs/${faq?.id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status === 200) {
                // Remove the deleted FAQ from the list
                const newfaq = Faqs.filter((item) => item?.id !== faq?.id);
                setFaqs(newfaq);
                Swal.fire("Success", "Suppression réussie", "success");
            } else if (response.status === 401) {
                Swal.fire(
                    "Unauthorized",
                    "You are not authorized to delete this FAQ",
                    "error"
                );
            }
        } catch (error) {
            Swal.fire("Error", "There was an issue deleting the FAQ", "error");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-full max-w-lg  ">
            {/* FAQ Question */}
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                    {faq?.qst}
                </h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-blue-500 focus:outline-none"
                >
                    {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                </button>
            </div>

            {/* FAQ réponse */}
            {isOpen && (
                <div className="mt-4 text-gray-700">
                    <p>{faq?.sol}</p>
                </div>
            )}

            {/* Deletion Button */}
            <div className="flex justify-end mt-4">
                <button
                    onClick={handle_Delete_Faq}
                    disabled={deleteLoading}
                    className={`${
                        deleteLoading ? "bg-gray-300" : "bg-red-500"
                    } text-white py-2 px-4 rounded-md focus:outline-none hover:bg-red-600 transition duration-200`}
                >
                    {deleteLoading ? "Deleting..." : "Delete FAQ"}
                </button>
            </div>
        </div>
    );
}

export default Card;
