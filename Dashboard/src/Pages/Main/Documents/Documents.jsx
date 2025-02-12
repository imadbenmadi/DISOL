import { useEffect, useState } from "react";
import axios from "axios";

export default function FileManager() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch files from backend
    const fetchFiles = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/dashboard/Documents",
                {
                    withCredentials: true,
                }
            );
            console.log(response.data.files);

            setFiles(response.data.files);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Upload a new file
    const handleUpload = async () => {
        if (!selectedFile) return alert("Please select a file");

        const formData = new FormData();
        formData.append("file", selectedFile);

        setLoading(true);
        try {
            await axios.post(
                "http://localhost:3000/dashboard/Documents",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            fetchFiles();
        } catch (error) {
            console.error("Error uploading file:", error);
        }
        setLoading(false);
    };

    // Delete a file
    const handleDelete = async (fileId) => {
        try {
            await axios.delete(
                `http://localhost:3000/dashboard/Documents/${fileId}`,
                {
                    withCredentials: true,
                }
            );
            setFiles(files.filter((file) => file.id !== fileId));
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold">Document Manager</h2>
            <div>
                <span>Link to google drive :</span>
                <a
                    href="https://drive.google.com/drive/folders/1euwDiYqfHIW-cbUvlorDDSmZRFFYYNUf?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Google Drive
                </a>
            </div>
            {/* File Upload */}
            <div className="flex items-center space-x-2">
                <input type="file" onChange={handleFileChange} />
                <button
                    onClick={handleUpload}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </div>

            {/* File List */}
            <ul className="space-y-2">
                {files.map((file) => (
                    <li
                        key={file.id}
                        className="flex justify-between items-center border p-2 rounded"
                    >
                        <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {file.name}
                        </a>
                        <button
                            onClick={() => handleDelete(file.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
