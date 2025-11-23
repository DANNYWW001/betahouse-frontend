

import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/Axios";

export const appContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });

  useEffect(() => {
    if (!token) return;

    if (user) return;

    const fetchMe = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        if (res.data?.user) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
      } catch (err) {
        console.error("Auth validation failed:", err);
        logout();
      }
    };

    fetchMe();
  }, [token]); 

  // ---- LOGIN FUNCTION ----
  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);

    localStorage.setItem("accessToken", tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ---- LOGOUT FUNCTION ----
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <appContext.Provider value={{ login, logout, user, token }}>
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
