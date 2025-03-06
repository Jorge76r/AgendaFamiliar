import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Almacenamiento seguro para React Native

// Tipo de usuario
type User = { email: string } | null;

// Estructura del contexto de autenticación
const AuthContext = createContext<{
  user: User;
  isAllowed: boolean;
  login: (email: string, token: string) => void;
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
  const [user, setUser] = useState<User>(null);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  // Método para iniciar sesión y guardar el token
  const login = async (email: string, token: string) => {
    try {
      setUser({ email });
      setIsAllowed(true);
      await AsyncStorage.setItem("authToken", token); // Guarda el token
    } catch (error) {
      console.error("Error guardando el token:", error);
    }
  };

  // Método para cerrar sesión y limpiar los datos almacenados
  const logout = async () => {
    try {
      setUser(null);
      setIsAllowed(false);
      await AsyncStorage.removeItem("authToken"); // Elimina el token
    } catch (error) {
      console.error("Error eliminando el token:", error);
    }
  };

  // Validar automáticamente el token al cargar la app
  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken"); // Recupera el token
        if (token) {
          const response = await fetch("http://192.168.1.48:3000/protected", {
            headers: { Authorization: `Bearer ${token}` },
        });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setIsAllowed(true);
          } else {
            logout(); // Token inválido o expirado
          }
        }
      } catch (error) {
        console.error("Error validando el token:", error);
        logout();
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAllowed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
