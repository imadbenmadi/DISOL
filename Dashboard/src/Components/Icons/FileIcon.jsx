import React from "react";

const FileIcon = ({ fileName }) => {
    const extension = fileName.split(".").pop().toLowerCase();

    if (extension === "xlsx" || extension === "xls" || extension === "csv") {
        return (
            <svg
                className="w-5 h-5 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M3 3a2 2 0 012-2h14a2 2 0 012 2v3.25h-2V3H5v18h14v-3.25h2V21a2 2 0 01-2 2H5a2 2 0 01-2-2V3zm17.9 6.362l-3.855 3.855 3.855 3.856-1.414 1.414-3.855-3.855-3.855 3.855-1.414-1.414 3.855-3.856-3.855-3.855 1.414-1.414 3.855 3.855 3.855-3.855 1.414 1.414z" />
            </svg>
        );
    } else if (
        extension === "docx" ||
        extension === "doc" ||
        extension === "txt"
    ) {
        return (
            <svg
                className="w-5 h-5 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
        );
    } else if (extension === "pptx" || extension === "ppt") {
        return (
            <svg
                className="w-5 h-5 text-orange-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
            </svg>
        );
    } else if (extension === "pdf") {
        return (
            <svg
                className="w-5 h-5 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm12 6V9c0-.55-.45-1-1-1h-2v5h2c.55 0 1-.45 1-1zm-2-3h1v3h-1V9zm4 2h1v-1h-1V9h1V8h-2v5h1v-1zm-8 1h1c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1H9v5h1v-2zm0-2h1v1h-1V9z" />
            </svg>
        );
    } else if (["jpg", "jpeg", "png", "gif", "svg"].includes(extension)) {
        return (
            <svg
                className="w-5 h-5 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
            </svg>
        );
    } else {
        return (
            <svg
                className="w-5 h-5 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
            </svg>
        );
    }
};

export default FileIcon;
