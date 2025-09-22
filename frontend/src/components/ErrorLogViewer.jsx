import React from "react";
import api from "../api/axios";
import { toast } from "sonner";

const ErrorLogViewer = ({ logFile }) => {
  if (!logFile) return null;

  // ✅ Strip path, only keep filename (e.g., error-log-123.csv)
  const filename = logFile.split("/").pop();

  const handleDownload = async () => {
    try {
      const response = await api.get(`/logs/${filename}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download log file:", err);
      toast.error("Failed to download log file. Please check the backend.");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-red-700 transition-colors"
    >
      Download Error Log
    </button>
  );
};

export default ErrorLogViewer;
