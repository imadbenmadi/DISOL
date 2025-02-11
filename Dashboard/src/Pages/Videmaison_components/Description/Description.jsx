import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Edit_Description() {
    const [formData, setFormData] = useState({
        Title: "",
        Description: "",
        image_link1: "",
        image_link2: "",
    });
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [imagePreview1, setImagePreview1] = useState(null);
    const [imagePreview2, setImagePreview2] = useState(null);

    useEffect(() => {
        // Fetch the existing description page data
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/Admin/Description_Page",
                    {
                        withCredentials: true,
                    }
                );

                const { Title, Description, image_link1, image_link2 } =
                    response.data.description_page; // Access description_page object correctly

                setFormData({
                    Title: Title || "", // Ensure default empty string
                    Description: Description || "",
                    image_link1: image_link1 || "",
                    image_link2: image_link2 || "",
                });

                setImagePreview1(
                    image_link1 ? `http://localhost:3000${image_link1}` : null
                );
                setImagePreview2(
                    image_link2 ? `http://localhost:3000${image_link2}` : null
                );
            } catch (error) {
                // Swal.fire({
                //     icon: "error",
                //     title: "Error",
                //     text: "Failed to load description page data.",
                // });
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange1 = (e) => {
        const file = e.target.files[0];
        setImage1(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview1(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange2 = (e) => {
        const file = e.target.files[0];
        setImage2(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview2(reader.result);
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("Title", formData.Title);
        data.append("Description", formData.Description);

        // Send new images only if they are selected
        if (image1 !== null) {
            data.append("image1", image1);
        } else {
            data.append("image1", formData.image_link1); // Send existing link if no new image
        }

        if (image2 !== null) {
            data.append("image2", image2);
        } else {
            data.append("image2", formData.image_link2); // Send existing link if no new image
        }

        try {
            const response = await axios.put(
                "http://localhost:3000/Admin/Description_Page",
                data,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Page de description mise à jour avec succès !",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Échec de la mise à jour de la page de description.",
            });
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-yallow_v mb-6">
                Modifier la page de description{" "}
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Titre
                    </label>
                    <input
                        type="text"
                        name="Title"
                        value={formData.Title}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        name="Description"
                        value={formData.Description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Image 1
                    </label>
                    {imagePreview1 ? (
                        <img
                            loading="lazy"
                            src={imagePreview1}
                            alt="Image 1 Preview"
                            className="w-32 h-32 object-cover rounded mx-auto mb-4 shadow-md"
                        />
                    ) : (
                        <p className="text-gray-500 text-sm text-center">
                            Aucune image sélectionnée
                        </p>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange1}
                        className="w-full border px-4 py-2 rounded-lg text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Image 2
                    </label>
                    {imagePreview2 ? (
                        <img
                            loading="lazy"
                            src={imagePreview2}
                            alt="Image 2 Preview"
                            className="w-32 h-32 object-cover rounded mx-auto mb-4 shadow-md"
                        />
                    ) : (
                        <p className="text-gray-500 text-sm text-center">
                            Aucune image sélectionnée
                        </p>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange2}
                        className="w-full border px-4 py-2 rounded-lg text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Sauvegarder
                </button>
            </form>
        </div>
    );
}

export default Edit_Description;
