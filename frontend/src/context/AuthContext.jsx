import { createContext, useContext, useState, useEffect } from "react";
import { apiAuthLogin, apiAuthRegister, apiAuthMe } from "../lib/api";

// create a React context for authentication
const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  // load user from localStorage if available (so refresh keeps login)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("auth_user") || "null"); }
    catch { return null; }
  });

  // load JWT token from localStorage if available
  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || "");

  // keep user in sync with localStorage
  useEffect(() => {
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  }, [user]);

  // keep token in sync with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("auth_token", token);
    else localStorage.removeItem("auth_token");
  }, [token]);

  // auto-restore session: if we only have token, fetch the user from backend
  useEffect(() => {
    (async () => {
      if (token && !user) {
        try {
          const u = await apiAuthMe(); // ask backend "who am I?"
          setUser(u);
        } catch {
          // if token invalid, clear it out
          setToken("");
          setUser(null);
        }
      }
    })();
  }, [token]); // only re-runs when token changes

  // real login using backend
  async function login(email, password) {
    try {
      const { token: t, user: u } = await apiAuthLogin(email, password);
      setToken(t); 
      setUser(u);
      return u; // return user for UI to use
    } catch (e) {
      throw e; // let UI handle error
    }
  }

  // clear user + token (logout)
  function logout() {
    setUser(null);
    setToken("");
  }

  // real register using backend
  async function register(name, email, password) {
    const { token: t, user: u } = await apiAuthRegister(name, email, password);
    setToken(t);
    setUser(u);
    return u;
  }

  // context provider makes auth data + functions available to app
  return (
    <AuthCtx.Provider value={{ user, token, setUser, setToken, login, logout, register }}>
      {children}
    </AuthCtx.Provider>
  );
}

// custom hook to easily use auth anywhere in app
export const useAuth = () => useContext(AuthCtx);
