import { useState, useEffect } from "react";
import { FaFolder, FaFileAlt } from "react-icons/fa";

export default function FileManager() {
    const [data, setData] = useState({ folders: [], standaloneFiles: [] });
    const [loading, setLoading] = useState(true);
    const [currentPath, setCurrentPath] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async (folderId = null) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/files?folderId=${folderId || ""}`);
            const result = await res.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching files", error);
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
                {currentPath.length > 0 && (
                    <button
                        onClick={goBack}
                        className="px-3 py-1 bg-gray-200 rounded-md"
                    >
                        ⬅ Back
                    </button>
                )}
                <h2 className="text-lg font-semibold ml-4">
                    {currentPath.length > 0
                        ? currentPath[currentPath.length - 1].folderName
                        : "Root"}
                </h2>
            </div>
            {loading ? (
                <div className="h-40 w-full bg-gray-200 animate-pulse" />
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {data.folders.map((folder) => (
                        <div
                            key={folder.id}
                            onDoubleClick={() => openFolder(folder)}
                            className="p-4 border rounded-md flex flex-col items-center cursor-pointer hover:bg-gray-100"
                        >
                            <FaFolder className="h-10 w-10 text-blue-500" />
                            <p className="text-sm mt-2">{folder.folderName}</p>
                        </div>
                    ))}
                    {data.standaloneFiles.map((file) => (
                        <div
                            key={file.id}
                            className="p-4 border rounded-md flex flex-col items-center"
                        >
                            <FaFileAlt className="h-10 w-10 text-gray-500" />
                            <p className="text-sm mt-2">{file.fileName}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
