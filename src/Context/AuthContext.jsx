import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getMe } from "../Services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const response = await getMe();

      if (response.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  console.log("Provider Value:", {
  user,
  setUser,
  loading,
  fetchCurrentUser,
});

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  // return useContext(AuthContext);
    const context = useContext(AuthContext);

   console.log("Auth Context:", context);

  return context;
};