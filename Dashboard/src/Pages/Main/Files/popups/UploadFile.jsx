import React from "react";
import { useState } from "react";
import { useRef } from "react";
// importing everything needed
import axios from "axios";
function UploadFile({
    showUploadFileModal,
    setShowUploadFileModal,
    currentPath,
    fetchFiles,
    ShowToast,
    setToast,
    selectedFolder,
    data,
}) {
    // File upload refs and state
    const fileInputRef = useRef(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    // UPLOAD FILE
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setUploadFile(e.target.files[0]);
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!uploadFile) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("fileType", uploadFile.type);
        formData.append("fileName", uploadFile.name);
        formData.append("uploaded_in", "local");
        formData.append("fileSize", Math.round(uploadFile.size / 1024)); // Convert to KB
        formData.append(
            "folderId",
            currentPath.length ? currentPath[currentPath.length - 1].id : null
        );

        try {
            const endpoint = currentPath.length
                ? `http://localhost:3000/dashboard/Files/${
                      currentPath[currentPath.length - 1].id
                  }`
                : "http://localhost:3000/dashboard/Files";

            const response = await axios.post(endpoint, formData, {
                withCredentials: true,
                validateStatus: (status) => status < 500,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);

            if (response.status === 200 || response.status === 201) {
                setUploadFile(null);
                setShowUploadFileModal(false);
                fetchFiles(
                    currentPath.length
                        ? currentPath[currentPath.length - 1].id
                        : null
                );
                ShowToast("File uploaded successfully", "success", setToast);
            } else {
                ShowToast("Failed to upload file", "error", setToast);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            ShowToast("Failed to upload file", "error", setToast);
        } finally {
            setUploading(false);
        }
    };
    return (
        <>
            {/* Upload File Modal */}
            {showUploadFileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Upload File
                        </h3>
                        <form onSubmit={handleFileUpload}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Select File
                                </label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Select Folder
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedFolder}
                                    onChange={(e) => e.target.value}
                                >
                                    <option key="root" value={null}>
                                        Root
                                    </option>

                                    {data.folders.map((folder) => (
                                        <option
                                            key={folder.id}
                                            value={folder.id}
                                        >
                                            {folder.folderName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {uploadFile && (
                                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                                    <p className="text-sm text-gray-700">
                                        <strong>File:</strong> {uploadFile.name}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Size:</strong>{" "}
                                        {Math.round(uploadFile.size / 1024)} KB
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Type:</strong>{" "}
                                        {uploadFile.type || "Unknown"}
                                    </p>
                                </div>
                            )}
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowUploadFileModal(false);
                                        setUploadFile(null);
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                    disabled={uploading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                                    disabled={uploading || !uploadFile}
                                >
                                    {uploading ? "Uploading..." : "Upload"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default UploadFile;
