import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar/Sidebar";
import Listuser from "./components/User/Listuser";
import ListDrukomaty from "./components/Drukomat/ListDrukomaty";
import CreateDrukomat from "./components/Drukomat/CreatDrukomat";
import CreateDraft from "./components/Drafts/CreateDraft";
import ListDrafts from "./components/Drafts/ListDrafts";
const App = () => {
  return (
    <div className="flex">
      {" "}
      <Sidebar />
      <div>
        <Routes>
          <Route path="/userList" element={<Listuser />} />
          <Route path="/drukomatList" element={<ListDrukomaty />} />
          <Route path="/creatDrukomat" element={<CreateDrukomat />} />
          <Route path="/creatDrafts" element={<CreateDraft />} />
          <Route path="/listDrafts" element={<ListDrafts />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
