import { createContext, useContext, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  return (
    <AuthCtx.Provider value={{}}>
      {children}
    </AuthCtx.Provider>
  );
}


export const useAuth = () => useContext(AuthCtx);
