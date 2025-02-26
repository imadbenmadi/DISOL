import React from "react";
import { FaFolder, FaEllipsisV } from "react-icons/fa";

function Grid({
    sortedFolders,
    sortedFiles,
    openFolder,
    setSelectedFolder,
    setNewFolderName,
    setShowRenameFolderModal,
    handleDeleteFolder,
    FileIcon,
    setSelectedFile,
    setMoveToFolderId,
    setMoveToRoot,
    fetchAllFolders,
    setShowMoveFileModal,
    handleDeleteFile,
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Folders */}
            {sortedFolders?.length > 0 &&
                sortedFolders.map((folder) => (
                    <div
                        key={`folder-${folder.id}`}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow group relative"
                    >
                        <div
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => openFolder(folder)}
                        >
                            <div className="text-blue-500 mb-2">
                                <FaFolder size={40} />
                            </div>
                            <span className="text-sm font-medium text-gray-900 text-center truncate w-full">
                                {folder.folderName}
                            </span>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-gray-500 hover:text-gray-700">
                                <FaEllipsisV />
                            </button>
                            <div className="absolute hidden right-0 bg-white shadow-lg rounded-lg py-1 mt-1 w-32 z-10 group-hover:block">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFolder(folder);
                                        setNewFolderName(folder.folderName);
                                        setShowRenameFolderModal(true);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Rename
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteFolder(folder);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            {/* Files */}
            {sortedFiles?.length > 0 &&
                sortedFiles.map((file) => (
                    <div
                        key={`file-${file.id}`}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow group relative"
                    >
                        <div className="flex flex-col items-center">
                            <FileIcon fileName={file.fileName} size={40} />
                            <a
                                href={file.file_Link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 text-sm font-medium text-blue-600 hover:underline truncate w-full text-center"
                            >
                                {file.fileName}
                            </a>
                            <span className="text-xs text-gray-500 mt-1">
                                {file.fileSize
                                    ? `${file.fileSize} KB`
                                    : "Unknown"}
                            </span>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-gray-500 hover:text-gray-700">
                                <FaEllipsisV />
                            </button>
                            <div className="absolute hidden right-0 bg-white shadow-lg rounded-lg py-1 mt-1 w-32 z-10 group-hover:block">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFile(file);
                                        setMoveToFolderId("");
                                        setMoveToRoot(false);
                                        fetchAllFolders();
                                        setShowMoveFileModal(true);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Move
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteFile(file);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Grid;
