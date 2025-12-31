import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user details
  const [isLogin, setIsLogin] = useState(false); // login state
  const [loading, setLoading] = useState(true); // loading state

  // -----------------------------
  // Load and validate token on refresh
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    async function checkUser() {
      try {
        const res = await fetch("http://localhost:4000/api/user/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401 || res.status === 403) {
          console.log("Token expired or invalid. Please login again.");
          setIsLogin(false);
          setUser(null);
          return;
        }

        const data = await res.json();

        if (res.ok) {
          setIsLogin(true);
          setUser(data.user);
        } else {
          console.log("Login check failed:", data);
          setIsLogin(false);
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setIsLogin(false);
        setUser(null);
      }

      setLoading(false);
    }

    checkUser();
  }, []);

  // -----------------------------
  // Called immediately after login
  // -----------------------------
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
    setIsLogin(true);
  };

  // -----------------------------
  // Logout user
  // -----------------------------
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
