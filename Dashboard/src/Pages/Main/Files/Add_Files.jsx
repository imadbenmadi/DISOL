import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";

const Add_File = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [uploadType, setUploadType] = useState("file"); // 'file' or 'link'

    const handleEditSubmit = async (values) => {
        setEditLoading(true);
        try {
            const formData = new FormData();
            if (uploadType === "file") {
                formData.append("file", values.file);
            } else {
                formData.append("link", values.link);
                formData.append("linkType", values.linkType);
            }

            const response = await axios.post(
                `http://localhost:3000/Admin/Files`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (response.status === 200) {
                Swal.fire("Success", "File added successfully", "success");
                Navigate("/File");
            } else {
                Swal.fire("Error", "Failed to add file", "error");
            }
        } catch (err) {
            Swal.fire("Error", "Network error, please try again", "error");
        } finally {
            setEditLoading(false);
        }
    };

    return (
        <div className="max-w-3xl overflow-auto mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center text-blue_v">
                Ajouter un Fichier
            </h2>
            <Formik
                initialValues={{
                    file: null,
                    link: "",
                    linkType: "",
                }}
                validate={(values) => {
                    const errors = {};
                    if (uploadType === "file" && !values.file) {
                        errors.file = "File is required";
                    }
                    if (uploadType === "link" && !values.link) {
                        errors.link = "Link is required";
                    }
                    if (uploadType === "link" && !values.linkType) {
                        errors.linkType = "Link type is required";
                    }
                    return errors;
                }}
                onSubmit={handleEditSubmit}
            >
                {({ setFieldValue, values }) => (
                    <Form>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Upload Type
                                </label>
                                <div className="mt-1">
                                    <label className="inline-flex items-center">
                                        <Field
                                            type="radio"
                                            name="uploadType"
                                            value="file"
                                            checked={uploadType === "file"}
                                            onChange={() =>
                                                setUploadType("file")
                                            }
                                            className="form-radio"
                                        />
                                        <span className="ml-2">
                                            Upload File
                                        </span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <Field
                                            type="radio"
                                            name="uploadType"
                                            value="link"
                                            checked={uploadType === "link"}
                                            onChange={() =>
                                                setUploadType("link")
                                            }
                                            className="form-radio"
                                        />
                                        <span className="ml-2">
                                            Provide Link
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {uploadType === "file" ? (
                                <div>
                                    <label
                                        htmlFor="file"
                                        className="block text-gray-700 font-medium"
                                    >
                                        File
                                    </label>
                                    <input
                                        id="file"
                                        name="file"
                                        type="file"
                                        onChange={(event) => {
                                            setFieldValue(
                                                "file",
                                                event.currentTarget.files[0]
                                            );
                                        }}
                                        className="mt-1 p-2 border rounded-md w-full"
                                    />
                                    <ErrorMessage
                                        name="file"
                                        component="div"
                                        style={{ color: "red" }}
                                    />
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label
                                            htmlFor="link"
                                            className="block text-gray-700 font-medium"
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
                                            style={{ color: "red" }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="linkType"
                                            className="block text-gray-700 font-medium"
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
                                            style={{ color: "red" }}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
                                >
                                    {editLoading
                                        ? "Sauvegarde..."
                                        : "Sauvegarder"}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Add_File;
