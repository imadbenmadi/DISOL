import { useState, useEffect } from "react";
import { FaFolder, FaFileAlt } from "react-icons/fa";
import axios from "axios";
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
            const res = await axios.get(
                `http://localhost:3000/dashboard/Files`,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            console.log(res);

            setData(res.data);
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

    if (loading) {
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }
    if (
        !data.folders.length ||
        (data.folders.length === 0 && data.standaloneFiles.length === 0)
    ) {
        return (
            <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                <div>No files found</div>
                <div>
                    <Link to={"/Main/Files/Add"}>Add new file</Link>
                </div>
            </div>
        );
    }
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
