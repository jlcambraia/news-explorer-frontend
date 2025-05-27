import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function ProtectedRoute({ children }) {
  const { isUserLoggedIn, token, handleOpenPopup, loginPopup } =
    useContext(CurrentUserContext);

  useEffect(() => {
    if (!isUserLoggedIn && !token) {
      handleOpenPopup(loginPopup);
    }
  }, [isUserLoggedIn, token, handleOpenPopup, loginPopup]);

  if (!isUserLoggedIn && token) {
    return null;
  }

  if (!isUserLoggedIn && !token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
