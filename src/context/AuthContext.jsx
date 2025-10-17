import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem("accessToken"));

  const login = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    setUserToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUserToken(null);
  };

  useEffect(() => {
    const handleStorage = () => setUserToken(localStorage.getItem("accessToken"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, login, logout, isLoggedIn: !!userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
