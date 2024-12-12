import React, { useState, useEffect } from "react";
import { fetchHistory, getToken } from "../../utils/api";

function HistoryTable() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      const token = getToken();
      const { data } = await fetchHistory(token);
      setReports(data);
    }
    loadHistory();
  }, []);

  return (
    <div className="bg-gray-50 shadow p-4 rounded">
      <h2 className="text-xl font-bold mb-4">History</h2>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Remark</th>
            <th className="border px-2 py-1">Score</th>
            <th className="border px-2 py-1">View</th>
            <th className="border px-2 py-1">Download</th>
          </tr>
        </thead>
        {reports.length > 0 ? (
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">{report.date}</td>
                <td className="border px-2 py-1">{report.remark}</td>
                <td className="border px-2 py-1">{report.score}</td>
                <td className="border px-2 py-1">
                  <a
                    href={`/result/${report.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </a>
                </td>
                <td className="border px-2 py-1">
                  <a
                    href={report.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:underline"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          ""
        )}
      </table>
    </div>
  );
}

export default HistoryTable;
