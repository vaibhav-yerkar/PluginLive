import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Dashboard/Profile";
import HistoryTable from "../components/Dashboard/HistoryTable";
import DefaultHOC from "../layout/Default.HOC";

function DashboardPage() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <button onClick={logout} className="text-blue-500 hover:text-blue-700">
          Logout
        </button>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Profile />
        <HistoryTable />
      </div>
    </div>
  );
}

export default DefaultHOC(DashboardPage);
