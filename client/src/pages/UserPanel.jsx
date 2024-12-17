import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "../components/UserPanel/Sidebar";
import Profile from "../components/UserPanel/Profile";

const UserPanel = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 bg-gray-100 p-6">
        <Routes>
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserPanel;
