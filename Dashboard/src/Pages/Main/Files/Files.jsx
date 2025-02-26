import { useEffect, useState } from "react";
import axios from "axios";
import { FaFolder } from "react-icons/fa";
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

    // Fetch files from backend
    const fetchFiles = async (folderId = null) => {
        setLoading(true);
        try {
            const endpoint = folderId
                ? `http://localhost:3000/dashboard/Files/${folderId}`
                : "http://localhost:3000/dashboard/Files";

            const response = await axios.get(endpoint, {
                withCredentials: true,
            });

            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching files:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

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
                <a
                    href="/Main/Files/Add"
                    className="text-blue-600 font-medium hover:underline text-sm"
                >
                    + Add new file
                </a>
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
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Folders */}
                                    {sortedFolders.map((folder) => (
                                        <tr
                                            key={`folder-${folder.id}`}
                                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                                            onClick={() => openFolder(folder)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
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
                                    className="p-4 border rounded-lg hover:shadow-md transition-shadow group cursor-pointer"
                                    onClick={() => openFolder(folder)}
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="text-blue-500 mb-2">
                                            <FaFolder size={40} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 text-center truncate w-full">
                                            {folder.folderName}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {/* Files */}
                            {sortedFiles.map((file) => (
                                <div
                                    key={`file-${file.id}`}
                                    className="p-4 border rounded-lg hover:shadow-md transition-shadow group"
                                >
                                    <div className="flex flex-col items-center">
                                        <FileIcon fileName={file.fileName} />
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
        </div>
    );
}
