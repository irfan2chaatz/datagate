import React from "react";
import { CheckCircle, XCircle, Flag } from "lucide-react";

const UploadStatus = ({ results }) => {
  if (!results || results.length === 0) return null;

  const totalInserted = results.reduce((sum, r) => sum + (r?.inserted || 0), 0);
  const totalFailed = results.reduce((sum, r) => sum + (r?.failed || 0), 0);

  return (
    <div className="w-full bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-md text-center">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <Flag className="text-yellow-600 w-5 h-5" />
        <span className="text-yellow-700 font-semibold text-base">
          Upload Summary
        </span>
      </div>

      {/* Stats Row */}
      <div className="flex justify-center gap-8 flex-wrap">
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-600 w-5 h-5" />
          <span className="text-green-700 font-medium">
            {totalInserted} Inserted
          </span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="text-red-600 w-5 h-5" />
          <span className="text-red-700 font-medium">
            {totalFailed} Failed
          </span>
        </div>
      </div>
    </div>
  );
};

export default UploadStatus;
