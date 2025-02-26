import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
    FaFolder,
    FaEdit,
    FaTrash,
    FaEllipsisV,
    FaPlus,
    FaArrowRight,
} from "react-icons/fa";
import FileIcon from "../../../Components/Icons/FileIcon";
import ListIcon from "../../../Components/Icons/ListIcon";
import GridIcon from "../../../Components/Icons/GridIcon";
import SearchIcon from "../../../Components/Icons/SearchIcon";
import AsendingOrder from "../../../Components/Icons/AsendingOrder";
import DescendingOrder from "../../../Components/Icons/DescendingOrder";
import InfoIcon from "../../../Components/Icons/InfoIcon";
import RefreshIcon from "../../../Components/Icons/RefreshIcon";

export default function FileManager() {
    const [data, setData] = useState({ folders: [], standaloneFiles: [] });
    const [loading, setLoading] = useState(true);
    const [currentPath, setCurrentPath] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [viewMode, setViewMode] = useState("list"); // list or grid

    // Modal states
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [showUploadFileModal, setShowUploadFileModal] = useState(false);
    const [showRenameFolderModal, setShowRenameFolderModal] = useState(false);
    const [showMoveFileModal, setShowMoveFileModal] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [newFolderName, setNewFolderName] = useState("");
    const [allFolders, setAllFolders] = useState([]);
    const [moveToFolderId, setMoveToFolderId] = useState("");
    const [moveToRoot, setMoveToRoot] = useState(false);

    // File upload refs and state
    const fileInputRef = useRef(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Toast notifications
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    // Helper function to show toast notifications
    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(
            () => setToast({ show: false, message: "", type: "" }),
            3000
        );
    };

    // Fetch files from backend
    const fetchFiles = async (folderId = null) => {
        setLoading(true);
        try {
            const endpoint = folderId
                ? `http://localhost:3000/dashboard/Folders/${folderId}`
                : "http://localhost:3000/dashboard/Files";

            const response = await axios.get(endpoint, {
                withCredentials: true,
            });

            if (folderId) {
                setData({
                    folders: [],
                    standaloneFiles: response.data.folder.files || [],
                });
            } else {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error fetching files:", error);
            showToast("Failed to load files", "error");
        } finally {
            setLoading(false);
        }
    };

    // Fetch all folders for move file functionality
    const fetchAllFolders = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/dashboard/Folders",
                {
                    withCredentials: true,
                }
            );
            setAllFolders(response.data.folders || []);
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    useEffect(() => {
        fetchFiles();
        fetchAllFolders();
    }, []);

    // FOLDER NAVIGATION
    const openFolder = (folder) => {
        setCurrentPath([...currentPath, folder]);
        fetchFiles(folder.id);
    };

    const goBack = () => {
        if (currentPath.length > 0) {
            const newPath = [...currentPath];
            newPath.pop();
            setCurrentPath(newPath);
            fetchFiles(newPath.length ? newPath[newPath.length - 1].id : null);
        }
    };

    // CREATE FOLDER
    const handleCreateFolder = async (e) => {
        e.preventDefault();
        if (!newFolderName.trim()) return;

        try {
            await axios.post(
                "http://localhost:3000/dashboard/Folders",
                { folderName: newFolderName },
                { withCredentials: true }
            );

            setNewFolderName("");
            setShowCreateFolderModal(false);
            fetchFiles(
                currentPath.length
                    ? currentPath[currentPath.length - 1].id
                    : null
            );
            showToast("Folder created successfully");
        } catch (error) {
            console.error("Error creating folder:", error);
            showToast("Failed to create folder", "error");
        }
    };

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
        formData.append("uploaded_in", new Date().toISOString());
        formData.append("fileSize", Math.round(uploadFile.size / 1024)); // Convert to KB
        formData.append(
            "file_Link",
            `http://localhost:3000/Files/${uploadFile.name}`
        );

        try {
            const endpoint = currentPath.length
                ? `http://localhost:3000/dashboard/Files/${
                      currentPath[currentPath.length - 1].id
                  }`
                : "http://localhost:3000/dashboard/Files";

            await axios.post(endpoint, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setUploadFile(null);
            setShowUploadFileModal(false);
            fetchFiles(
                currentPath.length
                    ? currentPath[currentPath.length - 1].id
                    : null
            );
            showToast("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
            showToast("Failed to upload file", "error");
        } finally {
            setUploading(false);
        }
    };

    // RENAME FOLDER
    const handleRenameFolder = async (e) => {
        e.preventDefault();
        if (!newFolderName.trim() || !selectedFolder) return;

        try {
            await axios.put(
                `http://localhost:3000/dashboard/Folders/${selectedFolder.id}`,
                { folderName: newFolderName },
                { withCredentials: true }
            );

            setNewFolderName("");
            setShowRenameFolderModal(false);
            setSelectedFolder(null);

            // Update current path if renamed folder is in it
            const updatedPath = currentPath.map((folder) => {
                if (folder.id === selectedFolder.id) {
                    return { ...folder, folderName: newFolderName };
                }
                return folder;
            });
            setCurrentPath(updatedPath);

            fetchFiles(
                currentPath.length
                    ? currentPath[currentPath.length - 1].id
                    : null
            );
            showToast("Folder renamed successfully");
        } catch (error) {
            console.error("Error renaming folder:", error);
            showToast("Failed to rename folder", "error");
        }
    };

    // MOVE FILE
    const handleMoveFile = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        try {
            await axios.post(
                `http://localhost:3000/dashboard/Files/${selectedFile.id}`,
                {
                    folderId: moveToRoot ? null : moveToFolderId,
                    toRoot: moveToRoot,
                },
                { withCredentials: true }
            );

            setShowMoveFileModal(false);
            setSelectedFile(null);
            setMoveToFolderId("");
            setMoveToRoot(false);
            fetchFiles(
                currentPath.length
                    ? currentPath[currentPath.length - 1].id
                    : null
            );
            showToast("File moved successfully");
        } catch (error) {
            console.error("Error moving file:", error);
            showToast("Failed to move file", "error");
        }
    };

    // DELETE FILE
    const handleDeleteFile = async (file) => {
        if (
            !window.confirm(`Are you sure you want to delete ${file.fileName}?`)
        )
            return;

        try {
            await axios.delete(
                `http://localhost:3000/dashboard/Files/${file.id}`,
                {
                    withCredentials: true,
                }
            );

            fetchFiles(
                currentPath.length
                    ? currentPath[currentPath.length - 1].id
                    : null
            );
            showToast("File deleted successfully");
        } catch (error) {
            console.error("Error deleting file:", error);
            showToast("Failed to delete file", "error");
        }
    };

    // DELETE FOLDER
    const handleDeleteFolder = async (folder) => {
        if (
            !window.confirm(
                `Are you sure you want to delete ${folder.folderName} and all its contents?`
            )
        )
            return;

        try {
            await axios.delete(
                `http://localhost:3000/dashboard/Folders/${folder.id}`,
                {
                    withCredentials: true,
                }
            );

            // If the folder being deleted is in the current path, go back
            if (currentPath.some((pathFolder) => pathFolder.id === folder.id)) {
                goBack();
            } else {
                fetchFiles(
                    currentPath.length
                        ? currentPath[currentPath.length - 1].id
                        : null
                );
            }

            showToast("Folder deleted successfully");
        } catch (error) {
            console.error("Error deleting folder:", error);
            showToast("Failed to delete folder", "error");
        }
    };

    // Filter files based on search query
    const filteredFolders = data.folders.filter((folder) =>
        folder.folderName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredFiles = data.standaloneFiles.filter((file) =>
        file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort folders
    const sortedFolders = [...filteredFolders].sort((a, b) => {
        if (sortBy === "name") {
            return sortOrder === "asc"
                ? a.folderName.localeCompare(b.folderName)
                : b.folderName.localeCompare(a.folderName);
        }
        return 0;
    });

    // Sort files
    const sortedFiles = [...filteredFiles].sort((a, b) => {
        if (sortBy === "name") {
            return sortOrder === "asc"
                ? a.fileName.localeCompare(b.fileName)
                : b.fileName.localeCompare(a.fileName);
        }
        return 0;
    });

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="bg-blue-50 p-6 border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="text-blue-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                                <path d="M12 9h4v4h-4zm-6 0h4v4H6zm6 6h4v4h-4zm-6 0h4v4H6z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                File Manager
                            </h2>
                            <p className="text-sm text-gray-600">
                                Server Files
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() =>
                                fetchFiles(
                                    currentPath.length
                                        ? currentPath[currentPath.length - 1].id
                                        : null
                                )
                            }
                            className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200 transition-colors"
                        >
                            <RefreshIcon />
                        </button>
                        <button
                            onClick={() =>
                                setViewMode(
                                    viewMode === "list" ? "grid" : "list"
                                )
                            }
                            className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200 transition-colors"
                        >
                            {viewMode === "list" ? <GridIcon /> : <ListIcon />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="px-6 py-3 bg-gray-50 border-b flex items-center">
                <div className="flex items-center space-x-2">
                    {currentPath.length > 0 && (
                        <button
                            onClick={goBack}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                        >
                            ⬅ Back
                        </button>
                    )}
                    <span className="text-sm font-medium">
                        {currentPath.length > 0
                            ? `Location: ${currentPath
                                  .map((folder) => folder.folderName)
                                  .join(" > ")}`
                            : "Location: Root"}
                    </span>
                </div>
            </div>

            {/* Search and Controls */}
            <div className="p-4 bg-gray-50 border-b flex flex-col sm:flex-row gap-3 justify-between">
                <div className="relative flex-grow max-w-md">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="search"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search files and folders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <select
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Sort by Name</option>
                    </select>
                    <button
                        onClick={() =>
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                        }
                        className="p-2 border rounded-lg hover:bg-gray-100"
                    >
                        {sortOrder === "asc" ? (
                            <AsendingOrder />
                        ) : (
                            <DescendingOrder />
                        )}
                    </button>
                </div>
            </div>

            {/* Action Bar */}
            <div className="px-6 py-3 bg-yellow-50 border-b flex items-center justify-between">
                <div className="flex items-center">
                    <InfoIcon />
                    <span className="text-sm text-gray-700 ml-2">
                        {sortedFolders.length} folder
                        {sortedFolders.length !== 1 ? "s" : ""} and{" "}
                        {sortedFiles.length} file
                        {sortedFiles.length !== 1 ? "s" : ""}
                    </span>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowCreateFolderModal(true)}
                        className="text-blue-600 font-medium hover:underline text-sm"
                    >
                        + New folder
                    </button>
                    <button
                        onClick={() => setShowUploadFileModal(true)}
                        className="text-blue-600 font-medium hover:underline text-sm"
                    >
                        + Upload file
                    </button>
                </div>
            </div>

            {/* File and Folder List */}
            {loading ? (
                <div className="w-full my-6 flex flex-col items-center justify-center py-12">
                    <span className="loader"></span>
                </div>
            ) : (
                <div className="p-6">
                    {sortedFolders.length === 0 && sortedFiles.length === 0 ? (
                        <div className="text-center py-8">
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                No files or folders found
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchQuery
                                    ? "Try a different search term"
                                    : "Add files or folders to see them here"}
                            </p>
                        </div>
                    ) : viewMode === "list" ? (
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
                                                onClick={() =>
                                                    openFolder(folder)
                                                }
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
                                                <span className="text-sm text-gray-500">
                                                    -
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedFolder(
                                                                folder
                                                            );
                                                            setNewFolderName(
                                                                folder.folderName
                                                            );
                                                            setShowRenameFolderModal(
                                                                true
                                                            );
                                                        }}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteFolder(
                                                                folder
                                                            )
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
                                                        <FileIcon
                                                            fileName={
                                                                file.fileName
                                                            }
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <a
                                                            href={
                                                                file.file_Link
                                                            }
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
                                                            setSelectedFile(
                                                                file
                                                            );
                                                            setMoveToFolderId(
                                                                ""
                                                            );
                                                            setMoveToRoot(
                                                                false
                                                            );
                                                            fetchAllFolders();
                                                            setShowMoveFileModal(
                                                                true
                                                            );
                                                        }}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <FaArrowRight />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteFile(
                                                                file
                                                            )
                                                        }
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
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Folders */}
                            {sortedFolders.map((folder) => (
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
                                        <div className="dropdown inline-block relative">
                                            <button className="text-gray-500 hover:text-gray-700">
                                                <FaEllipsisV />
                                            </button>
                                            <div className="dropdown-menu absolute hidden right-0 bg-white shadow-lg rounded-lg py-1 mt-1 w-32 z-10 group-hover:block">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedFolder(
                                                            folder
                                                        );
                                                        setNewFolderName(
                                                            folder.folderName
                                                        );
                                                        setShowRenameFolderModal(
                                                            true
                                                        );
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Rename
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteFolder(
                                                            folder
                                                        );
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Files */}
                            {sortedFiles.map((file) => (
                                <div
                                    key={`file-${file.id}`}
                                    className="p-4 border rounded-lg hover:shadow-md transition-shadow group relative"
                                >
                                    <div className="flex flex-col items-center">
                                        <FileIcon
                                            fileName={file.fileName}
                                            size={40}
                                        />
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
                                        <div className="dropdown inline-block relative">
                                            <button className="text-gray-500 hover:text-gray-700">
                                                <FaEllipsisV />
                                            </button>
                                            <div className="dropdown-menu absolute hidden right-0 bg-white shadow-lg rounded-lg py-1 mt-1 w-32 z-10 group-hover:block">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedFile(file);
                                                        setMoveToFolderId("");
                                                        setMoveToRoot(false);
                                                        fetchAllFolders();
                                                        setShowMoveFileModal(
                                                            true
                                                        );
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
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t text-right">
                <span className="text-xs text-gray-500">
                    {sortedFolders.length} folder
                    {sortedFolders.length !== 1 ? "s" : ""} and{" "}
                    {sortedFiles.length} file
                    {sortedFiles.length !== 1 ? "s" : ""} • Last refreshed at{" "}
                    {new Date().toLocaleTimeString()}
                </span>
            </div>
            {toast.show && (
                <div
                    className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg ${
                        toast.type === "error" ? "bg-red-500" : "bg-green-500"
                    } text-white`}
                >
                    {toast.message}
                </div>
            )}

            {/*Create Folder Modal */}

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

            {/* Rename Folder Modal */}
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

            {/* Move File Modal */}
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
        </div>
    );
}
