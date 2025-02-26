import React from "react";

function MoveFile({
    showMoveFileModal,
    setShowMoveFileModal,
    selectedFile,
    setSelectedFile,
    allFolders,
    handleMoveFile,
    setMoveToFolderId,
    setMoveToRoot,
    moveToFolderId,
    moveToRoot,
}) {
    return (
        <>
            {showMoveFileModal && selectedFile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Move File
                        </h3>
                        <form onSubmit={handleMoveFile}>
                            <div className="mb-4">
                                <p className="text-sm text-gray-700 mb-2">
                                    Moving:{" "}
                                    <strong>{selectedFile.fileName}</strong>
                                </p>
                                <div className="mb-3">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-4 w-4 text-blue-600"
                                            checked={moveToRoot}
                                            onChange={(e) => {
                                                setMoveToRoot(e.target.checked);
                                                if (e.target.checked) {
                                                    setMoveToFolderId("");
                                                }
                                            }}
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                                            Move to root folder
                                        </span>
                                    </label>
                                </div>
                                {!moveToRoot && (
                                    <div>
                                        <label
                                            htmlFor="targetFolder"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Select Destination Folder
                                        </label>
                                        <select
                                            id="targetFolder"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={moveToFolderId}
                                            onChange={(e) =>
                                                setMoveToFolderId(
                                                    e.target.value
                                                )
                                            }
                                            required={!moveToRoot}
                                            disabled={moveToRoot}
                                        >
                                            <option value="">
                                                Select a folder
                                            </option>
                                            {allFolders.map((folder) => (
                                                <option
                                                    key={folder.id}
                                                    value={folder.id}
                                                >
                                                    {folder.folderName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowMoveFileModal(false);
                                        setSelectedFile(null);
                                        setMoveToFolderId("");
                                        setMoveToRoot(false);
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                    disabled={!moveToRoot && !moveToFolderId}
                                >
                                    Move
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default MoveFile;
