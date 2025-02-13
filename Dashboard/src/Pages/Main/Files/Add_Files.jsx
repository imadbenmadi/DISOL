import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";

const UploadFile = () => {
    const navigate = useNavigate();
    const [uploadType, setUploadType] = useState("file");

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            if (uploadType === "file") {
                formData.append("file", values.file);
            } else {
                formData.append("link", values.link);
                formData.append("linkType", values.linkType);
            }

            const response = await axios.post(
                "http://localhost:3000/Admin/Files",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (response.status === 200) {
                Swal.fire("Success", "File uploaded successfully", "success");
                navigate("/File");
            } else {
                Swal.fire("Error", "Failed to upload file", "error");
            }
        } catch (err) {
            Swal.fire("Error", "Network error, please try again", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Upload File
            </h2>
            <Formik
                initialValues={{ file: null, link: "", linkType: "" }}
                validate={(values) => {
                    const errors = {};
                    if (uploadType === "file" && !values.file)
                        errors.file = "File is required";
                    if (uploadType === "link" && !values.link)
                        errors.link = "Link is required";
                    if (uploadType === "link" && !values.linkType)
                        errors.linkType = "Link type is required";
                    return errors;
                }}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="block font-medium">
                                Upload Type
                            </label>
                            <div className="mt-1 flex gap-4">
                                <label className="flex items-center gap-2">
                                    <Field
                                        type="radio"
                                        name="uploadType"
                                        value="file"
                                        checked={uploadType === "file"}
                                        onChange={() => setUploadType("file")}
                                    />
                                    Upload File
                                </label>
                                <label className="flex items-center gap-2">
                                    <Field
                                        type="radio"
                                        name="uploadType"
                                        value="link"
                                        checked={uploadType === "link"}
                                        onChange={() => setUploadType("link")}
                                    />
                                    Provide Link
                                </label>
                            </div>
                        </div>

                        {uploadType === "file" ? (
                            <div>
                                <label
                                    htmlFor="file"
                                    className="block font-medium"
                                >
                                    File
                                </label>
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={(e) =>
                                        setFieldValue("file", e.target.files[0])
                                    }
                                    className="mt-1 p-2 border rounded-md w-full"
                                />
                                <ErrorMessage
                                    name="file"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                        ) : (
                            <>
                                <div>
                                    <label
                                        htmlFor="link"
                                        className="block font-medium"
                                    >
                                        Link
                                    </label>
                                    <Field
                                        id="link"
                                        name="link"
                                        type="text"
                                        className="mt-1 p-2 border rounded-md w-full"
                                        placeholder="Enter link"
                                    />
                                    <ErrorMessage
                                        name="link"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="linkType"
                                        className="block font-medium"
                                    >
                                        Link Type
                                    </label>
                                    <Field
                                        as="select"
                                        id="linkType"
                                        name="linkType"
                                        className="mt-1 p-2 border rounded-md w-full"
                                    >
                                        <option value="">
                                            Select link type
                                        </option>
                                        <option value="googleDrive">
                                            Google Drive
                                        </option>
                                        <option value="googleSheets">
                                            Google Sheets
                                        </option>
                                        <option value="googleDocs">
                                            Google Docs
                                        </option>
                                    </Field>
                                    <ErrorMessage
                                        name="linkType"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                            </>
                        )}

                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
                            >
                                {isSubmitting ? "Uploading..." : "Upload"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UploadFile;
