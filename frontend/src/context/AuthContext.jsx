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

  useEffect(() => {
    if (token) localStorage.setItem("auth_token", token);
    else localStorage.removeItem("auth_token");
  }, [token]);

  function loginStub(email){
    const mockUser = { id: "u1", name: "Test User", email, role: "user", accountNumber: "BG12345678" };
    setUser(mockUser);
    setToken("demo-token");
    return mockUser;
  }

  function logout(){
    setUser(null);
    setToken("");
  }

  function registerStub(name, email){
    const mockUser = { id: "u2", name, email, role: "user", accountNumber: "BG87654321" };
    setUser(mockUser);
    setToken("demo-token");
    return mockUser;
  }


    return (
        <AuthCtx.Provider value={{ user, token, setUser, setToken, loginStub, logout, registerStub }}>
            {children}
        </AuthCtx.Provider>
    );
}


export const useAuth = () => useContext(AuthCtx);
