import React from "react";

function Nav({ currentPath, goBack }) {
    return (
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
    );
}

export default Nav;
