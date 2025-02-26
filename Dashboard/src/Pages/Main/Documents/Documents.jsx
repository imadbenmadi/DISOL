import { useEffect, useState } from "react";
import axios from "axios";
import Googl_drive_icon from "./Googl_drive_icon";
import FileIcon from "../../../Components/Icons/FileIcon";
import ListIcon from "../../../Components/Icons/ListIcon";
import GridIcon from "../../../Components/Icons/GridIcon";
import SearchIcon from "../../../Components/Icons/SearchIcon";
import AsendingOrder from "../../../Components/Icons/AsendingOrder";
import DescendingOrder from "../../../Components/Icons/DescendingOrder";
import InfoIcon from "../../../Components/Icons/InfoIcon";
import RefreshIcon from "../../../Components/Icons/RefreshIcon";
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
            setFiles(response.data.files);
            setLoading(false);
        } catch (error) {
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
                            {viewMode === "list" ? <ListIcon /> : <GridIcon />}
                        </button>
                    </div>
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
                            <AsendingOrder />
                        ) : (
                            <DescendingOrder />
                        )}
                    </button>
                </div>
            </div>

            {/* Google Drive Link */}
            <div className="px-6 py-3 bg-yellow-50 border-b flex items-center">
                <InfoIcon />
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
                <div className=" w-full h-full my-6 flex flex-col items-center justify-center">
                    <span className="loader"></span>
                </div>
            ) : (
                <div className="p-6">
                    {sortedFiles.length === 0 ? (
                        <div className="text-center py-8">
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
