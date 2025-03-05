import { createContext, useContext, useState } from "react";
// Importa una librería para decodificar el token, como jwt-decode (opcional).
// import jwt_decode from "jwt-decode";

type User = { email: string; token: string } | null;

const AuthContext = createContext<{
  user: User;
  isAllowed: boolean;
  login: (token: string) => void;
  logout: () => void;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  // Determinar si el usuario está permitido con base en la existencia del token
  const isAllowed = Boolean(user?.token);

  const login = (token: string) => {
    try {
      // Decodifica el token para obtener el correo electrónico, si es necesario.
      // Si usas jwt-decode, sería algo así:
      // const decoded: { email: string } = jwt_decode(token);
      // const email = decoded.email;

      // Temporalmente, supondremos que el token ya contiene directamente el correo.
      const email = "jorge76r@gmail.com"; // Reemplaza con lógica real según tu API.
      if (email) {
        setUser({ email, token });
      } else {
        throw new Error("El token no es válido.");
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      alert("No se pudo iniciar sesión. Verifica tus credenciales.");
    }
  };

  const logout = () => {
    setUser(null); // Eliminar el usuario y el token
  };

  return (
    <AuthContext.Provider value={{ user, isAllowed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
