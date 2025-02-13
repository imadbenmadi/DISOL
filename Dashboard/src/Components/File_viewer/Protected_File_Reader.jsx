import React, { useEffect, useState } from "react";
import axios from "axios";
const Protected_File_Reader = ({ fileName }) => {
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await fetch(`${fileName}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch file");
                }

                // Convert the response to a Blob
                const blob = await response.blob();
                // Create a URL for the Blob
                const url = URL.createObjectURL(blob);
                setFileUrl(url);
            } catch (error) {
                console.error("Error fetching file:", error);
            }
        };

        fetchFile();
    }, [fileName]);

    return (
        <div>
            {fileUrl ? (
                <iframe
                    src={fileUrl}
                    width="100%"
                    height="600px"
                    style={{ border: "none" }}
                />
            ) : (
                <p>Loading file...</p>
            )}
        </div>
    );
};

export default Protected_File_Reader;
