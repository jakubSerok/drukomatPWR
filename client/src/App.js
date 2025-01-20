import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Main from "./pages/Main";
import UserPanel from "./pages/UserPanel";
import ContextProvider from "./components/Context/Context";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <ContextProvider>
      <Router>
        {" "}
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userpanel/*" element={<UserPanel />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </ContextProvider>
  );
}

export default App;
