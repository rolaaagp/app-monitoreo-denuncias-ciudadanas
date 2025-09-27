// UserProvider.tsx
import { User } from "@core/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, router } from "expo-router";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("user");
        if (raw) setUserState(JSON.parse(raw));
      } catch (e) {
        console.error("Error loading user", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (userData: User) => {
    setUserState(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    setUserState(null);
    await AsyncStorage.removeItem("user");
    router.replace("/registro");
  };

  const setUser = (u: User | null) => setUserState(u);

  const value: UserContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    setUser,
  };

  if (loading) return null; // aquí podrías poner un spinner si quieres

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};

// ProtectedRoute.tsx
export const ProtectedRoute = ({
  children,
  redirectTo = "/registro",
}: {
  children: ReactNode;
  redirectTo?: string;
}) => {
  const { isAuthenticated, loading } = useUser();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace(redirectTo as Href);
  }, [loading, isAuthenticated]);

  if (loading) return null;
  if (!isAuthenticated) return null;

  return <>{children}</>;
};
