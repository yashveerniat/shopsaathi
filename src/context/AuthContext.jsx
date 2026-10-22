import { createContext, useContext, useEffect, useState } from "react";
import { api, getToken, setToken, clearToken } from "../services/api";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Pages currentUser.uid aur currentUser.email use karte hain
function toCurrentUser(u) {
  return { uid: u._id, email: u.email, name: u.name };
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Page refresh par token se session wapas lao
  useEffect(() => {
    async function restoreSession() {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const user = await api("/auth/profile");
        setCurrentUser(toCurrentUser(user));
        setUserRole(user.role);
      } catch {
        clearToken();
      }
      setLoading(false);
    }
    restoreSession();
  }, []);

  async function signup(email, password, role, name, phone) {
    const data = await api("/auth/register", {
      method: "POST",
      body: { name, email, password, phone, role },
    });
    setToken(data.token);
    setCurrentUser(toCurrentUser(data));
    setUserRole(data.role);
    return data;
  }

  async function login(email, password) {
    const data = await api("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    setToken(data.token);
    setCurrentUser(toCurrentUser(data));
    setUserRole(data.role);
    return data;
  }

  function logout() {
    clearToken();
    setCurrentUser(null);
    setUserRole(null);
    return Promise.resolve();
  }

  const value = { currentUser, userRole, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}