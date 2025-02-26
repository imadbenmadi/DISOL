import React from 'react'

function Footer(sortedFolders , sortedFiles) {
    return (
        <div className="bg-gray-50 px-6 py-4 border-t text-right">
            <span className="text-xs text-gray-500">
                {sortedFolders.length} folder
                {sortedFolders.length !== 1 ? "s" : ""} and {sortedFiles.length}{" "}
                file
                {sortedFiles.length !== 1 ? "s" : ""} • Last refreshed at{" "}
                {new Date().toLocaleTimeString()}
            </span>
        </div>
    );
}

export default Footer