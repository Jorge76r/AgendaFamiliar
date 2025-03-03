import { createContext, useContext, useState, ReactNode } from "react";

type User = { email: string } | null;

interface AuthContextProps {
  user: User;
  isAllowed: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  const login = (email: string) => {
    const isValidEmail = email.endsWith('.edu');
    if (isValidEmail) {
      setUser({ email });
      setIsAllowed(true);
    } else {
      setUser(null);
      setIsAllowed(false);
      alert("Solo correos .edu pueden ingresar");
    }
  };

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
