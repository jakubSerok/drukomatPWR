import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full p-6 pt-[150px]">
      <h2 className="text-2xl font-bold mb-6">User Panel</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link
              to="/userpanel/profile"
              className="hover:text-gray-400 transition"
            >
              Profile
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/userpanel/order"
              className="hover:text-gray-400 transition"
            >
              Order
            </Link>
          </li>
          {/* Add more sections here */}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
