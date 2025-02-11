import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import Card from "./Card";
import { BiMessage, BiTrash } from "react-icons/bi";

function Demands() {
    const Navigate = useNavigate();

    const [Demands, setDemands] = useState([]);
    const [DemandTypes, setDemandTypes] = useState([]); // State for demand types
    const [newType, setNewType] = useState(""); // State for new type input
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Fetch demands and demand types
    useEffect(() => {
        setLoading(true);
        const FetchData = async () => {
            try {
                // Fetch demands
                const demandsResponse = await axios.get(
                    `http://localhost:3000/Admin/Demands`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (demandsResponse.status === 200) {
                    setDemands(demandsResponse.data.demands);
                } else if (demandsResponse.status === 401) {
                    Swal.fire(
                        "Error",
                        "Vous devez vous reconnecter à nouveau",
                        "error"
                    );
                    Navigate("/Login");
                } else {
                    setError(demandsResponse.data);
                }

                // Fetch demand types
                const typesResponse = await axios.get(
                    `http://localhost:3000/Demands/types`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (typesResponse.status === 200) {
                    setDemandTypes(typesResponse.data.types);
                } else if (typesResponse.status === 401) {
                    Swal.fire(
                        "Error",
                        "Vous devez vous reconnecter à nouveau",
                        "error"
                    );
                    Navigate("/Login");
                } else {
                    setDemandTypes([]);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        FetchData();
    }, [Navigate]);

    // Add a new demand type
    const handleAddType = async () => {
        if (!newType.trim()) {
            Swal.fire("Erreur", "Veuillez entrer un type valide", "error");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:3000/Admin/Demands/types`,
                { type: newType },
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status === 200) {
                setDemandTypes([...DemandTypes, response.data.type]); // Assuming the response includes the new type with `id`
                setNewType("");
                Swal.fire("Succès", "Type ajouté avec succès", "success");
            } else if (response.status === 401) {
                Swal.fire(
                    "Error",
                    "Vous devez vous reconnecter à nouveau",
                    "error"
                );
                Navigate("/Login");
            } else {
                Swal.fire("Erreur", "Une erreur s'est produite", "error");
            }
        } catch (error) {
            Swal.fire("Erreur", "Une erreur s'est produite", "error");
        }
    };

    // Delete a demand type
    const handleDeleteType = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/Admin/Demands/types/${id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status === 200) {
                setDemandTypes(DemandTypes.filter((t) => t.id !== id)); // Use `id` for filtering
                Swal.fire("Succès", "Type supprimé avec succès", "success");
            } else if (response.status === 401) {
                Swal.fire(
                    "Error",
                    "Vous devez vous reconnecter à nouveau",
                    "error"
                );
                Navigate("/Login");
            } else {
                Swal.fire("Erreur", "Une erreur s'est produite", "error");
            }
        } catch (error) {
            Swal.fire("Erreur", "Une erreur s'est produite", "error");
        }
    };

    if (loading) {
        return (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error)
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">{error.demand}</div>
            </div>
        );
    else
        return (
            <div className="py-6 px-4">
                <div className="text-xl font-semibold text-yallow_v">
                    Gestion des demandes
                </div>
                <div className="w-[90%] md:w-[60%] mx-auto ">
                    {/* Add New Demand Type Section */}
                    <div className="my-6 p-4 bg-white rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">
                            Ajouter un type de demande
                        </h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newType}
                                onChange={(e) => setNewType(e.target.value)}
                                placeholder="Nouveau type"
                                className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                            />
                            <button
                                onClick={handleAddType}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>

                    {/* Display Demand Types */}
                    <div className="md:my-6 p-4 bg-white rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">
                            Types de demandes
                        </h3>
                        {DemandTypes.length === 0 ? (
                            <p className="text-gray-600">
                                Aucun type de demande disponible.
                            </p>
                        ) : (
                            <ul className="space-y-2">
                                {DemandTypes.map((type) => (
                                    <li
                                        key={type.id} // Use `id` as the key
                                        className="flex justify-between items-center p-2 border rounded-lg"
                                    >
                                        <span>{type.type}</span>
                                        <button
                                            onClick={() =>
                                                handleDeleteType(type.id)
                                            } // Pass `id` to the handler
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <BiTrash className="text-xl" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Display Demands */}
                {!Demands || Demands?.length === 0 ? (
                    <div className="text-md font-semibold text-gray_v text-center pt-12">
                        Aucune demande pour le moment
                    </div>
                ) : (
                    <div>
                        <div className="w-full flex justify-center py-4">
                            <div className="max-w-[300px] overflow-auto border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                                <div className="text-xs font-semibold pb-5 text-gray_v w-full">
                                    Nombre total de demandes :
                                </div>
                                <div className="flex justify-between gap-2 mx-2 w-full">
                                    <div className="font-semibold text-2xl">
                                        {Demands?.length}
                                    </div>
                                    <div className="shrink-0 text-yallow_v border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                        <BiMessage className="shrink-0 text-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {Demands &&
                            Demands.length > 0 &&
                            Demands?.map((demand) => {
                                return (
                                    <Card
                                        key={demand.id}
                                        Demand={demand}
                                        setDemands={setDemands}
                                        Demands={Demands}
                                    />
                                );
                            })}
                    </div>
                )}
            </div>
        );
}

export default Demands;
