import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const [laptops, setLaptops] = useState([]);
  const [issues, setIssues] = useState([]);

  const fetchLaptops = async () => {
    const res = await axios.get(
      "https://laptop-management-backend.vercel.app/api/laptops",
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    setLaptops(res.data);
  };
  const fetchIssues = async () => {
    const res = await axios.get(
      "https://laptop-management-backend.vercel.app/api/issues",
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    setIssues(res.data);
  };
  useEffect(() => {
    fetchIssues();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
        fetchLaptops,
        laptops,
        setLaptops,
        fetchIssues,
        issues,
        setIssues,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
