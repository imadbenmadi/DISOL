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
import Header from "./Header";
import Footer from "./Footer";
import List from "./List";
import FileIcon from "../../../Components/Icons/FileIcon";
import ListIcon from "../../../Components/Icons/ListIcon";
import GridIcon from "../../../Components/Icons/GridIcon";
import SearchIcon from "../../../Components/Icons/SearchIcon";
import AsendingOrder from "../../../Components/Icons/AsendingOrder";
import DescendingOrder from "../../../Components/Icons/DescendingOrder";
import InfoIcon from "../../../Components/Icons/InfoIcon";
import RefreshIcon from "../../../Components/Icons/RefreshIcon";
import ShowToast from "../../../Components/Alerts/ShowToast";
import Grid from "./Grid";
import MoveFile from "./MoveFile";
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

    // Fetch files from backend
    const fetchFiles = async (folderId = null) => {
        setLoading(true);
        try {
            const endpoint = folderId
                ? // ? `http://localhost:3000/dashboard/Folders/${folderId}`
                  `http://localhost:3000/dashboard/Folders/${folderId}`
                : "http://localhost:3000/dashboard/Files";

            const response = await axios.get(endpoint, {
                withCredentials: true,
            });
            console.log(response.data);

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
            ShowToast("Failed to load files", "error", setToast);
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
        console.log("Creating folder");

        e.preventDefault();
        if (!newFolderName.trim()) return;

        try {
            await axios.post(
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
            ShowToast("Folder renamed successfully", "success", setToast);
        } catch (error) {
            console.error("Error renaming folder:", error);
            ShowToast("Failed to rename folder", "error", setToast);
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
            ShowToast("File moved successfully", "success", setToast);
        } catch (error) {
            console.error("Error moving file:", error);
            ShowToast("Failed to move file", "error", setToast);
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
            ShowToast("File deleted successfully", "success", setToast);
        } catch (error) {
            console.error("Error deleting file:", error);
            ShowToast("Failed to delete file", "error", setToast);
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

            ShowToast("Folder deleted successfully", "success", setToast);
        } catch (error) {
            console.error("Error deleting folder:", error);
            ShowToast("Failed to delete folder", "error", setToast);
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
            <Header
                fetchFiles={fetchFiles}
                currentPath={currentPath}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

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
                        <List
                            sortedFolders={sortedFolders}
                            sortedFiles={sortedFiles}
                            openFolder={openFolder}
                            setSelectedFolder={setSelectedFolder}
                            setNewFolderName={setNewFolderName}
                            setShowRenameFolderModal={setShowRenameFolderModal}
                            handleDeleteFolder={handleDeleteFolder}
                            FileIcon={FileIcon}
                            setSelectedFile={setSelectedFile}
                            setMoveToFolderId={setMoveToFolderId}
                            setMoveToRoot={setMoveToRoot}
                            fetchAllFolders={fetchAllFolders}
                            setShowMoveFileModal={setShowMoveFileModal}
                            handleDeleteFile={handleDeleteFile}
                        />
                    ) : (
                        <Grid
                            sortedFolders={sortedFolders}
                            sortedFiles={sortedFiles}
                            openFolder={openFolder}
                            setSelectedFolder={setSelectedFolder}
                            setNewFolderName={setNewFolderName}
                            setShowRenameFolderModal={setShowRenameFolderModal}
                            handleDeleteFolder={handleDeleteFolder}
                            FileIcon={FileIcon}
                            setSelectedFile={setSelectedFile}
                            setMoveToFolderId={setMoveToFolderId}
                            setMoveToRoot={setMoveToRoot}
                            fetchAllFolders={fetchAllFolders}
                            setShowMoveFileModal={setShowMoveFileModal}
                            handleDeleteFile={handleDeleteFile}
                        />
                    )}
                </div>
            )}

            <Footer sortedFolders={sortedFolders} sortedFiles={sortedFiles} />
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
            <MoveFile
                showMoveFileModal={showMoveFileModal}
                setShowMoveFileModal={setShowMoveFileModal}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                allFolders={allFolders}
                handleMoveFile={handleMoveFile}
                setMoveToFolderId={setMoveToFolderId}
                setMoveToRoot={setMoveToRoot}
                moveToFolderId={moveToFolderId}
                moveToRoot={moveToRoot}
            />
        </div>
    );
}
