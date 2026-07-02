import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authApi } from "../api/client";
import { AuthContext } from "./authContext";

const ACCESS_TOKEN_KEY = "school_portal_access_token";

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem(ACCESS_TOKEN_KEY),
  );
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeSession = useCallback((payload) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
    setAccessToken(payload.accessToken);
    setUser(payload.user);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setAccessToken(null);
    setUser(null);
  }, []);

  const refreshSession = useCallback(async () => {
    const payload = await authApi.refresh();
    storeSession(payload);
    return payload.user;
  }, [storeSession]);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        if (accessToken) {
          const payload = await authApi.me(accessToken);
          if (isMounted) setUser(payload.user);
          return;
        }

        const payload = await authApi.refresh();
        if (isMounted) storeSession(payload);
      } catch {
        if (isMounted) clearSession();
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, [accessToken, clearSession, storeSession]);

  const login = useCallback(
    async (credentials) => {
      const payload = await authApi.login(credentials);
      storeSession(payload);
      return payload.user;
    },
    [storeSession],
  );

  const register = useCallback(
    async (data) => {
      const payload = await authApi.register(data);
      storeSession(payload);
      return payload.user;
    },
    [storeSession],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const value = useMemo(
    () => ({
      accessToken,
      user,
      isAuthenticated: Boolean(user && accessToken),
      isLoading,
      login,
      register,
      logout,
      refreshSession,
    }),
    [accessToken, isLoading, login, logout, refreshSession, register, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
