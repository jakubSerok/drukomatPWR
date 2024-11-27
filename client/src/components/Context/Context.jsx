import { createContext, useEffect, useState } from "react";

import axios from "axios";
export const Context = createContext(null);

const ContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,
    token,
    setToken,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
