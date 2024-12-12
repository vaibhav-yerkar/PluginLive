import React from "react";
import { getUserName } from "../../utils/auth";

function Profile() {
  const user = {
    name: getUserName().toUpperCase(),
    profilePic: "https://via.placeholder.com/150",
    avgScore: 0,
    totalTests: 0,
  };

  return (
    <div className="bg-white shadow p-4 rounded-lg py-8">
      <div className="flex items-center px-8 gap-12">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p>Average Score: {user.avgScore}</p>
          <p>Total Tests: {user.totalTests}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
