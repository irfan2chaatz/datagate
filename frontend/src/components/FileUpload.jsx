import React, { useState } from "react";
import { UploadCloud, XCircle } from "lucide-react";
import { toast } from "sonner";
import api from "../api/axios";

const FileUpload = ({ onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const clearFiles = () => setFiles([]);

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select CSV file(s)!");
      return;
    }
    setLoading(true);
    setUploadProgress({});

    try {
      for (const [index, file] of files.entries()) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await api.post("/csv/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            setUploadProgress((prev) => ({
              ...prev,
              [index]: percent,
            }));
          },
        });

        // ✅ Pass backend response (inserted, failed, logFile)
        onUploadComplete(res.data);
      }

      toast.success("Upload finished!");
      setFiles([]);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed! Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 transition-all duration-300 bg-gray-50 hover:border-blue-400 w-full"
    >
      <UploadCloud className="w-12 h-12 text-gray-500 mb-3 animate-bounce" />
      <p className="text-gray-600 mb-2 text-center">
        Drag & drop your CSV here or{" "}
        <label className="text-blue-600 font-medium cursor-pointer hover:underline">
          browse
          <input
            type="file"
            accept=".csv"
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </p>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4 w-full space-y-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded-lg shadow"
            >
              <span className="text-gray-700 text-sm truncate">{file.name}</span>
              <div className="flex items-center gap-2">
                {uploadProgress[index] && (
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress[index]}%` }}
                    ></div>
                  </div>
                )}
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="mt-6 flex w-full justify-between gap-3">
        <button
          onClick={clearFiles}
          disabled={files.length === 0}
          className="flex-1 py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Clear All
        </button>
        <button
          onClick={handleUpload}
          disabled={loading}
          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? "Uploading..." : "Upload All"}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
