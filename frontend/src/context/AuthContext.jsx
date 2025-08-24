import { createContext, useContext, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");

    return (
        <AuthCtx.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </AuthCtx.Provider>
    );
}


export const useAuth = () => useContext(AuthCtx);
