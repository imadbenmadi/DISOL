import { useEffect, useState } from "react";
import axios from "axios";

export default function FileManager() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch files from backend
    const fetchFiles = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/dashboard/Documents",
                {
                    withCredentials: true,
                }
            );
            console.log(response.data.files);

            setFiles(response.data.files);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold">Document Manager</h2>
            <div>
                <span>
                    edit and cahnge files from this Link to google drive :{" "}
                </span>
                <a
                    href="https://drive.google.com/drive/folders/1euwDiYqfHIW-cbUvlorDDSmZRFFYYNUf?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Google Drive
                </a>
            </div>

            {/* File List */}
            <ul className="space-y-2">
                {files.map((file) => (
                    <li
                        key={file.id}
                        className="flex justify-between items-center border p-2 rounded"
                    >
                        <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {file.name}
                        </a>
                    </li>
                ))}
            </ul>
            <hr />
            
        </div>
    );
}
