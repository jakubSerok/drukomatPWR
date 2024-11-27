import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar/Sidebar";
import Listuser from "./components/User/Listuser";
import ListDrukomaty from "./components/Drukomat/ListDrukomaty";

const App = () => {
  return (
    <div className="flex">
      {" "}
      <Sidebar />
      <div>
        <Routes>
          <Route path="/userList" element={<Listuser />} />
          <Route path="/drukomatList" element={<ListDrukomaty />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
