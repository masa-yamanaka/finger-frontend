"use client";
import React, { createContext, useContext, useState } from "react";

const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [accountData, setAccountData] = useState({});
  return (
    <AccountContext.Provider value={{ accountData, setAccountData }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => useContext(AccountContext);
