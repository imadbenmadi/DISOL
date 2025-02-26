import { useEffect, useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import List from "./List";
import FileIcon from "../../../Components/Icons/FileIcon";

import InfoIcon from "../../../Components/Icons/InfoIcon";
import ShowToast from "../../../Components/Alerts/ShowToast";
import Grid from "./Grid";
import MoveFile from "./MoveFile";
import UploadFile_popup from "./popups/UploadFile";
import RenameFolder from "./popups/RenameFolder";
import CreateFolder from "./popups/CreateFolder";
import SearchControl from "./SearchControl";
import Nav from "./Nav";
import {
    fetchFiles,
    fetchAllFolders,
    handleRenameFolder,
    handleMoveFile,
    handleDeleteFile,
    handleDeleteFolder,
} from "./apis/apis";

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

    // Toast notifications
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    useEffect(() => {
        // Initial data load
        fetchFiles(null, apiParams);
        fetchAllFolders(apiParams);
    }, []);

    // FOLDER NAVIGATION
    const openFolder = (folder) => {
        setCurrentPath([...currentPath, folder]);
        fetchFiles(folder.id, apiParams);
    };

    const goBack = () => {
        if (currentPath.length > 0) {
            const newPath = [...currentPath];
            newPath.pop();
            setCurrentPath(newPath);
            fetchFiles(
                newPath.length ? newPath[newPath.length - 1].id : null,
                apiParams
            );
        }
    };

    // Wrapper functions to call API functions with correct parameters
    const handleRenameAction = (e) => {
        handleRenameFolder(e, {
            newFolderName,
            selectedFolder,
            setNewFolderName,
            setShowRenameFolderModal,
            setSelectedFolder,
            currentPath,
            setCurrentPath,
            fetchFiles,
            ShowToast,
            setToast,
        });
    };

    const handleMoveAction = (e) => {
        handleMoveFile(e, {
            selectedFile,
            moveToRoot,
            moveToFolderId,
            setShowMoveFileModal,
            setSelectedFile,
            setMoveToFolderId,
            setMoveToRoot,
            fetchFiles,
            currentPath,
            ShowToast,
            setToast,
            setLoading,
            setData,
        });
    };

    const handleDeleteFileAction = (file) => {
        handleDeleteFile(file, {
            fetchFiles,
            currentPath,
            ShowToast,
            setToast,
            setLoading,
            setData,
        });
    };

    const handleDeleteFolderAction = (folder) => {
        handleDeleteFolder(folder, {
            fetchFiles,
            currentPath,
            goBack,
            ShowToast,
            setToast,
            setLoading,
            setData,
        });
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
    // Create params object for API functions
    const apiParams = {
        setLoading,
        setData,
        ShowToast,
        setToast,
        setAllFolders,
        currentPath,
        setCurrentPath,
        setNewFolderName,
        setShowRenameFolderModal,
        setSelectedFolder,
        setShowMoveFileModal,
        setSelectedFile,
        setMoveToFolderId,
        setMoveToRoot,
        goBack,
        moveToRoot,
        moveToFolderId,
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
            {/* Header Section */}
            <Header
                fetchFiles={(folderId) => fetchFiles(folderId, apiParams)}
                currentPath={currentPath}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
            {/* Navigation Bar */}
            <Nav currentPath={currentPath} goBack={goBack} />
            {/* Search and Controls */}
            <SearchControl
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
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
                            handleDeleteFolder={handleDeleteFolderAction}
                            FileIcon={FileIcon}
                            setSelectedFile={setSelectedFile}
                            setMoveToFolderId={setMoveToFolderId}
                            setMoveToRoot={setMoveToRoot}
                            fetchAllFolders={() => fetchAllFolders(apiParams)}
                            setShowMoveFileModal={setShowMoveFileModal}
                            handleDeleteFile={handleDeleteFileAction}
                        />
                    ) : (
                        <Grid
                            sortedFolders={sortedFolders}
                            sortedFiles={sortedFiles}
                            openFolder={openFolder}
                            setSelectedFolder={setSelectedFolder}
                            setNewFolderName={setNewFolderName}
                            setShowRenameFolderModal={setShowRenameFolderModal}
                            handleDeleteFolder={handleDeleteFolderAction}
                            FileIcon={FileIcon}
                            setSelectedFile={setSelectedFile}
                            setMoveToFolderId={setMoveToFolderId}
                            setMoveToRoot={setMoveToRoot}
                            fetchAllFolders={() => fetchAllFolders(apiParams)}
                            setShowMoveFileModal={setShowMoveFileModal}
                            handleDeleteFile={handleDeleteFileAction}
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
            <CreateFolder
                showCreateFolderModal={showCreateFolderModal}
                setShowCreateFolderModal={setShowCreateFolderModal}
                newFolderName={newFolderName}
                setNewFolderName={setNewFolderName}
                currentPath={currentPath}
                fetchFiles={(folderId) => fetchFiles(folderId, apiParams)}
                ShowToast={ShowToast}
                setToast={setToast}
            />
            {/* upload file popup */}
            <UploadFile_popup
                showUploadFileModal={showUploadFileModal}
                setShowUploadFileModal={setShowUploadFileModal}
                currentPath={currentPath}
                fetchFiles={(folderId) => fetchFiles(folderId, apiParams)}
                ShowToast={ShowToast}
                setToast={setToast}
                selectedFolder={selectedFolder}
                data={data}
            />
            {/* Rename Folder Modal */}
            <RenameFolder
                showRenameFolderModal={showRenameFolderModal}
                selectedFolder={selectedFolder}
                newFolderName={newFolderName}
                setNewFolderName={setNewFolderName}
                setShowRenameFolderModal={setShowRenameFolderModal}
                setSelectedFolder={setSelectedFolder}
                handleRenameFolder={handleRenameAction}
            />
            {/* Move File Modal */}
            <MoveFile
                showMoveFileModal={showMoveFileModal}
                setShowMoveFileModal={setShowMoveFileModal}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                allFolders={allFolders}
                handleMoveFile={handleMoveAction}
                setMoveToFolderId={setMoveToFolderId}
                setMoveToRoot={setMoveToRoot}
                moveToFolderId={moveToFolderId}
                moveToRoot={moveToRoot}
            />
        </div>
    );
}
