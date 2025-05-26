import { useState, useEffect } from "react";
import { authApi } from "../utils/apis/AuthApi.js";
import { mainApi } from "../utils/apis/MainApi.js";
import { tokenService } from "../utils/auth/Token.js";

export const useAuth = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [registrationFailed, setRegistrationFailed] = useState(false);

  const token = tokenService.getToken();

  useEffect(() => {
    const token = tokenService.getToken();
    if (!token) return;

    const checkUserAuth = async () => {
      try {
        const userdata = await mainApi.getUserInfo();
        setCurrentUserInfo(userdata);
        setIsUserLoggedIn(true);
      } catch {
        setIsUserLoggedIn(false);
      }
    };
    checkUserAuth();
  }, []);

  const handleLogin = async (email, password) => {
    if (!email || !password) return;

    try {
      const authorizeUser = await authApi.authorize(email, password);
      tokenService.setToken(authorizeUser.token);
      const userdata = await mainApi.getUserInfo();
      setCurrentUserInfo(userdata);
      setIsUserLoggedIn(true);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const handleRegistration = async (email, password, name) => {
    if (!email || !password || !name) return;

    try {
      const registeredUser = await authApi.register(email, password, name);
      if (registeredUser) {
        setRegistrationFailed(false);
        return { success: true };
      }
    } catch (error) {
      setRegistrationFailed(true);
      return { success: false, error };
    }
  };

  const handleLogout = () => {
    tokenService.removeToken();
    setIsUserLoggedIn(false);
    setCurrentUserInfo(null);
  };

  return {
    isUserLoggedIn,
    currentUserInfo,
    registrationFailed,
    handleLogin,
    handleRegistration,
    handleLogout,
    token,
  };
};
