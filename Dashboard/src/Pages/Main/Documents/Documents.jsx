import { useEffect, useState } from "react";
import axios from "axios";
import Googl_drive_icon from "./Googl_drive_icon";
import FileIcon from "./FileIcon";
export default function FileManager() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [viewMode, setViewMode] = useState("list"); // list or grid

    // Fetch files from backend - using your actual API endpoint
    const fetchFiles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "http://localhost:3000/dashboard/Documents",
                {
                    withCredentials: true,
                }
            );
            console.log(response.data.files);
            setFiles(response.data.files);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching files:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    // Filter files based on search query
    const filteredFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort files
    const sortedFiles = [...filteredFiles].sort((a, b) => {
        if (sortBy === "name") {
            return sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        }
        return 0;
    });

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
            {/* Header Section with Google Drive branding */}
            <div className="bg-blue-50 p-6 border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Googl_drive_icon />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Document Manager
                            </h2>
                            <p className="text-sm text-gray-600">
                                Connected to Google Drive
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={fetchFiles}
                            className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                        <button
                            onClick={() =>
                                setViewMode(
                                    viewMode === "list" ? "grid" : "list"
                                )
                            }
                            className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200 transition-colors"
                        >
                            {viewMode === "list" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Search and Controls */}
            <div className="p-4 bg-gray-50 border-b flex flex-col sm:flex-row gap-3 justify-between">
                <div className="relative flex-grow max-w-md">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search documents..."
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
                            <svg
                                className="w-5 h-5 text-gray-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-5 h-5 text-gray-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Google Drive Link */}
            <div className="px-6 py-3 bg-yellow-50 border-b flex items-center">
                <svg
                    className="w-5 h-5 text-yellow-600 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span className="text-sm text-gray-700">
                    Edit and change files from this link to{" "}
                    <a
                        href="https://drive.google.com/drive/folders/1euwDiYqfHIW-cbUvlorDDSmZRFFYYNUf?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Google Drive
                    </a>
                </span>
            </div>

            {/* File List */}
            {loading ? (
                <div className="p-12 flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="p-6">
                    {sortedFiles.length === 0 ? (
                        <div className="text-center py-8">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                No files found
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchQuery
                                    ? "Try a different search term"
                                    : "Upload files to your Google Drive to see them here"}
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
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sortedFiles.map((file) => (
                                        <tr
                                            key={file.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <FileIcon
                                                            fileName={file.name}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <a
                                                            href={
                                                                file.webViewLink
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm font-medium text-blue-600 hover:underline"
                                                        >
                                                            {file.name}
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {sortedFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="p-4 border rounded-lg hover:shadow-md transition-shadow group"
                                >
                                    <div className="flex items-center">
                                        <FileIcon fileName={file.name} />
                                        <a
                                            href={file.webViewLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-2 text-sm font-medium text-blue-600 hover:underline truncate"
                                        >
                                            {file.name}
                                        </a>
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
                    {sortedFiles.length} document
                    {sortedFiles.length !== 1 ? "s" : ""} • Last refreshed at{" "}
                    {new Date().toLocaleTimeString()}
                </span>
            </div>
        </div>
    );
}
