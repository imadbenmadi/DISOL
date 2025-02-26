import React from "react";

function RenameFolder({
    showRenameFolderModal,
    selectedFolder,
    newFolderName,
    setNewFolderName,
    setShowRenameFolderModal,
    setSelectedFolder,
    handleRenameFolder, 
    
}) {
    return (
        <>
            {showRenameFolderModal && selectedFolder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Rename Folder
                        </h3>
                        <form onSubmit={handleRenameFolder}>
                            <div className="mb-4">
                                <label
                                    htmlFor="newFolderName"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    New Folder Name
                                </label>
                                <input
                                    type="text"
                                    id="newFolderName"
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
                                        setShowRenameFolderModal(false);
                                        setSelectedFolder(null);
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
                                    Rename
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default RenameFolder;
