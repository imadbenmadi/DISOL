import React from "react";

import ListIcon from "../../../Components/Icons/ListIcon";
import GridIcon from "../../../Components/Icons/GridIcon";

import RefreshIcon from "../../../Components/Icons/RefreshIcon";

function Header({ fetchFiles, currentPath, viewMode, setViewMode }) {
    return (
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
                        <p className="text-sm text-gray-600">Server Files</p>
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
                            setViewMode(viewMode === "list" ? "grid" : "list")
                        }
                        className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200 transition-colors"
                    >
                        {viewMode === "list" ? <GridIcon /> : <ListIcon />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
