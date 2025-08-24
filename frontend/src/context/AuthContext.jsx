import { createContext, useContext, useState, useEffect } from "react";
import { apiAuthLogin, apiAuthRegister, apiAuthMe } from "../lib/api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("auth_user") || "null"); }
    catch { return null; }
  });

  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || "");

   useEffect(() => {
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("auth_token", token);
    else localStorage.removeItem("auth_token");
  }, [token]);

  // restore session from token on load if user missing
  useEffect(() => {
    (async () => {
      if (token && !user) {
        try {
          const u = await apiAuthMe();
          setUser(u);
        } catch {
          setToken("");
          setUser(null);
        }
      }
    })();
  }, [token]); // intentionally only depends on token

  // real login using backend
  async function login(email, password){
  try {
    const { token: t, user: u } = await apiAuthLogin(email, password);
    setToken(t); setUser(u);
    return u;
  } catch (e) {
    throw e; // or alert("Login failed")
  }
}

  function logout(){
    setUser(null);
    setToken("");
  }

  //real register using backend
  async function register(name, email, password){
    const { token: t, user: u } = await apiAuthRegister(name, email, password);
    setToken(t);
    setUser(u);
    return u;
  }

    return (
        <AuthCtx.Provider value={{ user, token, setUser, setToken, login, logout, register }}>
            {children}
        </AuthCtx.Provider>
    );
}

export const useAuth = () => useContext(AuthCtx);
