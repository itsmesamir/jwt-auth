import React, { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const response = await axios.post("http://localhost:5001/api/auth/login", {
      username,
      password,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    setUser({ username });
  };

  const register = async (username, password) => {
    await axios.post("http://localhost:5001/api/auth/register", {
      username,
      password,
    });
  };

  const logout = async () => {
    await axios.post("http://localhost:5001/api/auth/logout");
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
