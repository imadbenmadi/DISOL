import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function EditMainPage() {
    const [formData, setFormData] = useState({
        Title: "",
        Description: "",
        button: "",
        image_link: "",
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        // Fetch the existing about page data
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/Admin/About_Page",
                    {
                        withCredentials: true,
                    }
                );

                const { Title, Description, button, image_link } =
                    response.data.about_page; // Corrected to access about_page

                setFormData({
                    Title: Title || "", // Ensure default empty string
                    Description: Description || "",
                    button: button || "",
                    image_link: image_link || "",
                });
                setImagePreview(
                    image_link ? `http://localhost:3000${image_link}` : null
                );
            } catch (error) {
                // Swal.fire({
                //     icon: "error",
                //     title: "Error",
                //     text: "Failed to load about page data.",
                // });
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("Title", formData.Title);
        data.append("Description", formData.Description);
        data.append("button", formData.button);

        if (image) {
            data.append("image", image);
        } else data.append("image", formData.image_link);

        try {
            const response = await axios.put(
                "http://localhost:3000/Admin/About_Page",
                data,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Page principale mise à jour avec succès !",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Échec de la mise à jour de la page principale.",
            });
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-yallow_v mb-6">
                Modifier la page principale{" "}
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
                        Button Text
                    </label>
                    <input
                        type="text"
                        name="button"
                        value={formData.button}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Image
                    </label>
                    {imagePreview ? (
                        <img
                            loading="lazy"
                            src={imagePreview}
                            alt="Image Preview"
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
                        onChange={handleFileChange}
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

export default EditMainPage;
