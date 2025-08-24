import { createContext, useContext, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("auth_user") || "null"); }
    catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || "");

    return (
        <AuthCtx.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </AuthCtx.Provider>
    );
}


export const useAuth = () => useContext(AuthCtx);
