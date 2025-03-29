import React, { createContext, useContext, useState } from "react";

// Tipo de usuario
type User = { email: string } | null;

// Estructura del contexto de autenticación
const AuthContext = createContext<{
  user: User;
  isAllowed: boolean;
  login: (email: string) => void; // Solo requiere email
  logout: () => void;
} | null>(null);

// Hook para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null); // Estado para el usuario
  const [isAllowed, setIsAllowed] = useState<boolean>(false); // Controla si el usuario está autenticado

  // Método para iniciar sesión
  const login = (email: string) => {
    setUser({ email });
    setIsAllowed(true);
  };

  // Método para cerrar sesión
  const logout = () => {
    setUser(null);
    setIsAllowed(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAllowed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;