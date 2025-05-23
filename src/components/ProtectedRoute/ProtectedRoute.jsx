import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function ProtectedRoute({ children }) {
  const { isUserLoggedIn, handleOpenPopup, loginPopup } =
    useContext(CurrentUserContext);

  useEffect(() => {
    if (!isUserLoggedIn) {
      handleOpenPopup(loginPopup);
    }
  }, [isUserLoggedIn, handleOpenPopup, loginPopup]);

  if (!isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
