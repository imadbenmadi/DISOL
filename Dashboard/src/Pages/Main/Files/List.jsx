import React from "react";
import {
    FaFolder,
    FaEdit,
    FaTrash,
    FaEllipsisV,
    FaPlus,
    FaArrowRight,
} from "react-icons/fa";
function List({
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
        <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Type
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Size
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {/* Folders */}
                    {sortedFolders.map((folder) => (
                        <tr
                            key={`folder-${folder.id}`}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td
                                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                                onClick={() => openFolder(folder)}
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 text-blue-500">
                                        <FaFolder size={20} />
                                    </div>
                                    <div className="ml-4">
                                        <span className="text-sm font-medium text-gray-900">
                                            {folder.folderName}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-500">
                                    Folder
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-500">-</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => {
                                            setSelectedFolder(folder);
                                            setNewFolderName(folder.folderName);
                                            setShowRenameFolderModal(true);
                                        }}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteFolder(folder)
                                        }
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {/* Files */}
                    {sortedFiles.map((file) => (
                        <tr
                            key={`file-${file.id}`}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <FileIcon fileName={file.fileName} />
                                    </div>
                                    <div className="ml-4">
                                        <a
                                            href={file.file_Link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-blue-600 hover:underline"
                                        >
                                            {file.fileName}
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-500">
                                    {file.fileType?.toUpperCase()}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-500">
                                    {file.fileSize
                                        ? `${file.fileSize} KB`
                                        : "Unknown"}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => {
                                            setSelectedFile(file);
                                            setMoveToFolderId("");
                                            setMoveToRoot(false);
                                            fetchAllFolders();
                                            setShowMoveFileModal(true);
                                        }}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        <FaArrowRight />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteFile(file)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default List;
