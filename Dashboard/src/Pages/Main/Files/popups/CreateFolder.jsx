import React from "react";
import axios from "axios";

function CreateFolder({
    showCreateFolderModal,
    setShowCreateFolderModal,
    newFolderName,
    setNewFolderName,
    currentPath,
    fetchFiles,
    ShowToast,
    setToast,
}) {
    // CREATE FOLDER
    const handleCreateFolder = async (e) => {

        e.preventDefault();
        if (!newFolderName.trim()) return;
        console.log("Creating folder");

        try {
            const response = await axios.post(
                "http://localhost:3000/dashboard/Folders",
                { folderName: newFolderName },
                { withCredentials: true }
            );
            console.log(response);

            setNewFolderName("");
            setShowCreateFolderModal(false);
            fetchFiles(
                currentPath.length
                    ? currentPath[currentPath.length - 1].id
                    : null
            );
            ShowToast("Folder created successfully", "success", setToast);
        } catch (error) {
            console.error("Error creating folder:", error);
            ShowToast("Failed to create folder", "error", setToast);
        }
    };

    return (
        <>
            {showCreateFolderModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Create New Folder
                        </h3>
                        <form onSubmit={handleCreateFolder}>
                            <div className="mb-4">
                                <label
                                    htmlFor="folderName"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Folder Name
                                </label>
                                <input
                                    type="text"
                                    id="folderName"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newFolderName}
                                    onChange={(e) =>
                                        setNewFolderName(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateFolderModal(false);
                                        setNewFolderName("");
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateFolder;
