import React, { useEffect, useState } from "react";
import { fetchReport, getToken } from "../utils/api";
import { useParams } from "react-router-dom";
import DefaultHOC from "../layout/Default.HOC";

function ResultPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    async function loadReport() {
      const token = getToken();
      const { data } = await fetchReport(id, token);
      setReport(data);
    }
    loadReport();
  }, [id]);

  if (!report) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Report</h1>
      <div className="bg-white shadow p-4 rounded mb-6">
        <h2 className="text-xl font-bold">Interview Results</h2>
        <p>Date: {report.date}</p>
        <p>Score: {report.score}</p>
        <p>Remark: {report.remark}</p>
        <a
          href={report.downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
        >
          Download Report
        </a>
      </div>

      {/* Report Summary Section */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Report Summary</h2>
        <p>{report.summary || "No summary available for this report."}</p>
      </div>
    </div>
  );
}

export default DefaultHOC(ResultPage);
