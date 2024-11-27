import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserPlus,
  FaList,
  FaClipboardList,
  FaCartPlus,
} from "react-icons/fa"; // Importing relevant icons
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="flex flex-col pt-[30px] gap-[20px] w-full max-w-[250px] h-screen bg-slate-500 border-r-2 border-black">
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <div className="flex items-center justify-center mx-[20px] px-[10px] py-[5px] rounded-md bg-[#f6f6f6] gap-[20px] cursor-pointer">
          <MdDashboard size={20} />
          <p>Dashboard</p>
        </div>
      </Link>
      <Link to="/userList" style={{ textDecoration: "none" }}>
        <div className="flex items-center justify-center mx-[20px] px-[10px] py-[5px] rounded-md bg-[#f6f6f6] gap-[20px] cursor-pointer">
          <FaUserPlus size={20} />
          <p>User List</p>
        </div>
      </Link>

      <Link to="/drukomatList" style={{ textDecoration: "none" }}>
        <div className="flex items-center justify-center mx-[20px] px-[10px] py-[5px] rounded-md bg-[#f6f6f6] gap-[20px] cursor-pointer">
          <FaList size={20} />
          <p>Drukomat List</p>
        </div>
      </Link>

      <Link to="/creatDrukomat" style={{ textDecoration: "none" }}>
        <div className="flex items-center justify-center mx-[20px] px-[10px] py-[5px] rounded-md bg-[#f6f6f6] gap-[20px] cursor-pointer">
          <FaClipboardList size={20} />
          <p>Create Drukomat</p>
        </div>
      </Link>
      <Link to="/order" style={{ textDecoration: "none" }}>
        <div className="flex items-center justify-center mx-[20px] px-[10px] py-[5px] rounded-md bg-[#f6f6f6] gap-[20px] cursor-pointer">
          <FaCartPlus size={20} />
          <p>Order</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
