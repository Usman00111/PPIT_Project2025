import { createContext, useContext, useState, useEffect } from "react";

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

    return (
        <AuthCtx.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </AuthCtx.Provider>
    );
}


export const useAuth = () => useContext(AuthCtx);
