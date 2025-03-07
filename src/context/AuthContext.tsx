import { createContext, useContext, useState, ReactNode } from "react";

// Tipado para los valores del contexto
interface AuthContextType {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
}

// Creamos el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para acceder al contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Proveedor de contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (email: string) => {
    setUser(email); // Simula autenticación
    localStorage.setItem("user", email); // Guardar en localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
