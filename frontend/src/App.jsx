import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import UploadStatus from "./components/UploadStatus";
import ErrorLogViewer from "./components/ErrorLogViewer";

function App() {
  const [results, setResults] = useState([]);

  const handleUploadComplete = (result) => {
    setResults((prev) => [...prev, result]);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-pulse delay-2000"></div>
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-pink-300 rounded-full opacity-20 blur-2xl animate-pulse delay-1000"></div>

      {/* Main Card */}
      <div className="z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 drop-shadow-lg mb-3">
          DataGate
        </h1>
        <p className="text-gray-600 text-center text-sm md:text-lg mb-6">
          Validate & upload your CSV files seamlessly
        </p>

        {/* File Upload */}
        <div className="w-full">
          <FileUpload onUploadComplete={handleUploadComplete} />
        </div>

        {/* Summary + Error Log */}
        {results.length > 0 && (
          <div className="mt-6 w-full flex flex-col gap-4">
            {/* Unified summary of all uploads */}
            <UploadStatus results={results} />

            {/* Show last uploaded log file download only */}
            {results[results.length - 1]?.logFile && (
              <ErrorLogViewer logFile={results[results.length - 1].logFile} />
            )}
          </div>
        )}
      </div>

      <footer className="absolute bottom-4 text-gray-500 text-xs md:text-sm">
        &copy; 2025 DataGate | CSV Validation & Upload System
      </footer>
    </div>
  );
}

export default App;
