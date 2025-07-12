import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { apiService } from "../services/apiService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { email, username, imageUrl }
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const response = await apiService.getMyPage();
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchUser().finally(() => setIsLoading(false));
  }, [fetchUser]);

  const value = { user, setUser, fetchUser, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);