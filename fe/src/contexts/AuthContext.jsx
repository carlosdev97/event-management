import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

// Creamos el contexto

const AuthContext = createContext();

// Creamos el provider

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargamos el usuario cuando el componente se monta

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para hacer login

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(
        "https://event-management-api-0kcl.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );

      const data = await response.data;

      // Guardamos los datos en el local storage

      const userData = {
        id: data.id,
        name: data.name,
        token: data.token,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
    } catch (err) {
      console.log(err);
      if (err.status === 404) {
        return err.status;
      } else if (err.status === 401) {
        return err.status;
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
