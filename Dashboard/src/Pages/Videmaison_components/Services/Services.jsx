import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Services() {
    const [Services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const Navigate = useNavigate();
    const [delete_loading, setDeleteLoading] = useState(false);

    const handle_delete = async (id) => {
        setDeleteLoading(true);
        try {
            const response = await axios.delete(
                `http://localhost:3000/Admin/Services/${id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status === 200) {
                Swal.fire("Success", "Service Suppression réussie!", "success");
                setServices((prev) => prev.filter((s) => s.id !== id));
            } else {
                Swal.fire(
                    "Error",
                    response.data.message || "Failed to delete the service",
                    "error"
                );
            }
        } catch (error) {
            // Swal.fire(
            //     "Error",
            //     "An unexpected error occurred. Try again.",
            //     "error"
            // );
        } finally {
            setDeleteLoading(false);
        }
    };

    useEffect(() => {
        const FetchServices = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Services`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    setServices(response.data.service);
                } else if (response.status === 401) {
                    Swal.fire("Error", "Vous devez vous reconnecter", "error");
                    Navigate("/Login");
                } else {
                    setError(
                        response.data.message || "Failed to fetch services"
                    );
                }
            } catch (error) {
                setError(error.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        FetchServices();
    }, [Navigate]);

    if (loading) {
        return (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">{error}</div>
            </div>
        );
    }

    return (
        <div className="py-6 px-4">
            <div className="text-xl font-semibold text-yellow-500">
                Nos Services
            </div>
            {Services.length === 0 ? (
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="text-md font-semibold text-gray-500 text-center pt-12">
                        Pas encore de services{" "}
                    </div>
                    <Link
                        to="/Services/Add"
                        className="mx-auto py-2 px-4 rounded bg-blue-500 text-white cursor-pointer font-semibold text-sm"
                    >
                        Ajouter un Service
                    </Link>
                </div>
            ) : (
                <div>
                    <div className="my-6 flex flex-col gap-6">
                        <Link
                            to="/Services/Add"
                            className="mx-auto py-2 px-4 rounded bg-blue-500 text-white cursor-pointer font-semibold text-sm"
                        >
                            Ajouter un Service
                        </Link>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Services.map((service) => (
                                <Service_card
                                    key={service.id}
                                    service={service}
                                    handle_delete={handle_delete}
                                    delete_loading={delete_loading}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Service_card({ service, handle_delete, delete_loading }) {
    return (
        <div
            className="border rounded-lg shadow-md bg-white hover:shadow-lg
         transition-shadow duration-300"
        >
            {service.image_link && (
                <img
                    loading="lazy"
                    src={`http://localhost:3000${service.image_link}`}
                    alt={service.Title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            )}

            <div className="p-4">
                <h4 className="text-lg font-semibold text-yallow_v text-center mb-2  break-words">
                    {service?.Title}
                </h4>
                <p className="text-gray-700 mb-4  break-words">
                    {service.Description}
                </p>
            </div>
            {delete_loading ? (
                <span className="small-loader mt-2 w-full m-auto"></span>
            ) : (
                <div
                    className="bg-red-500 cursor-pointer text-white font-semibold px-4 py-2 rounded-md w-fit mx-auto mb-6"
                    onClick={() =>
                        Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handle_delete(service.id);
                            }
                        })
                    }
                >
                    Delete
                </div>
            )}
        </div>
    );
}

export default Services;
