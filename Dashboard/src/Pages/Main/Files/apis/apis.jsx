import axios from "axios";
import Swal from "sweetalert2";

// Fetch files from backend
const fetchFiles = async (
    folderId = null,
    { setLoading, setData, ShowToast, setToast }
) => {
    setLoading(true);
    try {
        const endpoint = folderId
            ? `http://localhost:3000/dashboard/Folders/${folderId}`
            : "http://localhost:3000/dashboard/Files";

        const response = await axios.get(endpoint, {
            withCredentials: true,
        });
        console.log("API Response:", response.data);

        if (folderId && response.data.folder) {
            // Check both possible file property names (Files and files)
            const folderFiles =
                response.data.folder.Files || response.data.folder.files || [];
            const subfolders = response.data.folder.subfolder || [];

            setData({
                folders: subfolders,
                standaloneFiles: folderFiles,
            });
        } else {
            // Handle the root folder response
            setData({
                folders: response.data.folders || [],
                standaloneFiles: response.data.standaloneFiles || [],
            });
        }
    } catch (error) {
        console.error("Error fetching files:", error);
        ShowToast("Failed to load files", "error", setToast);
    } finally {
        setLoading(false);
    }
};

// Fetch all folders for move file functionality
const fetchAllFolders = async ({ setAllFolders }) => {
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

const handleRenameFolder = async (
    e,
    {
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
    }
) => {
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

        const updatedPath = currentPath.map((folder) =>
            folder.id === selectedFolder.id
                ? { ...folder, folderName: newFolderName }
                : folder
        );
        setCurrentPath(updatedPath);

        fetchFiles(
            currentPath.length ? currentPath[currentPath.length - 1].id : null,
            { setLoading, setData, ShowToast, setToast }
        );
        ShowToast("Folder renamed successfully", "success", setToast);
    } catch (error) {
        console.error("Error renaming folder:", error);
        ShowToast("Failed to rename folder", "error", setToast);
    }
};

const handleMoveFile = async (
    e,
    {
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
    }
) => {
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
            currentPath.length ? currentPath[currentPath.length - 1].id : null,
            { setLoading, setData, ShowToast, setToast }
        );
        ShowToast("File moved successfully", "success", setToast);
    } catch (error) {
        console.error("Error moving file:", error);
        ShowToast("Failed to move file", "error", setToast);
    }
};

const handleDeleteFile = async (
    file,
    { fetchFiles, currentPath, ShowToast, setToast, setLoading, setData }
) => {
    if (!window.confirm(`Are you sure you want to delete ${file.fileName}?`))
        return;

    try {
        await axios.delete(`http://localhost:3000/dashboard/Files/${file.id}`, {
            withCredentials: true,
        });

        fetchFiles(
            currentPath.length ? currentPath[currentPath.length - 1].id : null,
            { setLoading, setData, ShowToast, setToast }
        );
        ShowToast("File deleted successfully", "success", setToast);
    } catch (error) {
        console.error("Error deleting file:", error);
        ShowToast("Failed to delete file", "error", setToast);
    }
};

const handleDeleteFolder = async (
    folder,
    {
        fetchFiles,
        currentPath,
        goBack,
        ShowToast,
        setToast,
        setLoading,
        setData,
    }
) => {
    Swal.fire({
        title: "Are you sure?",
        text: `Are you sure you want to delete ${folder.folderName} and all its contents?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axios.delete(
                    `http://localhost:3000/dashboard/Folders/${folder.id}`,
                    { withCredentials: true }
                );

                if (
                    currentPath.some(
                        (pathFolder) => pathFolder.id === folder.id
                    )
                ) {
                    goBack();
                } else {
                    fetchFiles(
                        currentPath.length
                            ? currentPath[currentPath.length - 1].id
                            : null,
                        { setLoading, setData, ShowToast, setToast }
                    );
                }

                ShowToast("Folder deleted successfully", "success", setToast);
            } catch (error) {
                console.error("Error deleting folder:", error);
                ShowToast("Failed to delete folder", "error", setToast);
            }
        }
    });
};

export {
    handleRenameFolder,
    handleMoveFile,
    handleDeleteFile,
    handleDeleteFolder,
    fetchFiles,
    fetchAllFolders,
};
