import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import Card from "./Card";
import { BiMessage } from "react-icons/bi";
import { Link } from "react-router-dom";
function Files() {
    const Navigate = useNavigate();

    const [Files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const FetchFiles = async ({ setFiles, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Files`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    const files = response.data.Files;
                    setFiles(files);
                } else if (response.status == 401) {
                    Swal.fire("Error", "You have to Login again", "error");
                    Navigate("/Login");
                    setError(response.data);
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        FetchFiles({ setFiles, setLoading, setError });
    }, []);

    if (loading) {
        return (
            <div className=" w-full h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error)
        return (
            <div className=" w-full h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    else
        return (
            <div className=" py-6 px-4">
                <div className=" text-xl font-semibold text-yallow_v"> FAQ</div>

                {!Files || Files?.length == 0 ? (
                    <div className=" flex flex-col gap-2 items-center justify-center">
                        <div className="text-md font-semibold text-gray_v text-center pt-12">
                            Pas encore de FAQ{" "}
                        </div>
                        <Link
                            to={"/File/Add"}
                            className="mx-auto py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                        >
                            Ajouter FaQ{" "}
                        </Link>
                    </div>
                ) : (
                    <div className=" my-6 flex flex-col gap-6">
                        <Link
                            to={"/File/Add"}
                            className="mx-auto py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                        >
                            Ajouter FaQ{" "}
                        </Link>
                        <div className=" flex flex-col items-center justify-center  w-[90%] pt-6">
                            {Files &&
                                Files.length > 0 &&
                                Files?.map((file) => {
                                    return (
                                        <Card
                                            key={file.id}
                                            file={file}
                                            setFiles={setFiles}
                                            Files={Files}
                                            // handle_Delete_Files={handle_Delete_Files}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                )}
            </div>
        );
}

export default Files;
