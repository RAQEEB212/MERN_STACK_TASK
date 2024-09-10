"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadURL, setUploadURL] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter(); // Initialize useRouter

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        setUploadURL(null);
        setErrorMessage(null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile) {
            setErrorMessage("Please select a file to upload.");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await axios.post(
                "http://18.222.218.159:5003/api/users/uploadImage",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setUploadURL(response.data.url || "No URL returned");
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Something went wrong!");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center">
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="relative sm:max-w-lg w-full p-8 bg-white rounded-xl shadow-lg z-10">
                <div className="text-center">
                    <h2 className="mt-5 text-3xl font-bold text-gray-100">File Upload</h2>
                    <p className="mt-2 text-sm text-gray-300">Upload your files easily and securely.</p>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-100">Attach Document</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col rounded-lg border-2 border-dashed w-full h-60 p-10 group text-center hover:bg-gray-100 hover:border-blue-500 transition duration-300 ease-in-out">
                                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                        <img
                                            className="h-36 object-center"
                                            src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                                            alt="Upload illustration"
                                        />
                                    </div>
                                    <p className="pointer-none text-gray-500">
                                        <span className="text-sm">Drag and drop</span> files here <br /> or{" "}
                                        <a href="#" className="text-blue-600 hover:underline">
                                            select a file
                                        </a>{" "}
                                        from your computer
                                    </p>
                                </div>
                                <input type="file" className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className={`px-4 py-2 font-semibold text-white rounded-md bg-blue-500 hover:bg-blue-600 ${
                                isUploading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isUploading}
                        >
                            {isUploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </form>

                {errorMessage && <div className="mt-4 text-red-600">{errorMessage}</div>}

                {uploadURL && (
                    <div className="mt-4 text-green-600">
                        <p>Uploaded successfully! URL: </p>
                        <a href={uploadURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            {uploadURL}
                        </a>
                    </div>
                )}

                {/* Add the Next Task Button */}
                <div className="mt-8 text-center" style={{marginLeft:"400px",fontSize:"20px"}}>
                    <button
                        onClick={() => router.push("/menu-request")} // Navigate to Menu Request Page
                        className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
                        style={{fontSize:"20px",backgroundColor:"aqua"}}

                    >
                        Next Task: Menu Request Form
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
