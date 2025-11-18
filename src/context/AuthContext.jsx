import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);         // Stored user data
  const [isLogin, setIsLogin] = useState(false);  // Login state
  const [loading, setLoading] = useState(true);   // Loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    async function checkUser() {
      try {
        const res = await fetch("http://localhost:4000/api/user/login_check", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        if (res.ok) {
          setIsLogin(true);
          setUser(data.user);
        } else {
          setIsLogin(false);
          setUser(null);
        }
      } catch (err) {
        setIsLogin(false);
        setUser(null);
      }

      setLoading(false);
    }

    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin,
        setIsLogin,
        setUser,
        root: "user", // Added here
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
