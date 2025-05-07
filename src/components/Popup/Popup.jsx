import "./Popup.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Popup({
  children,
  title,
  closePopup,
  openPopup,
  registerPopup,
  loginPopup,
}) {
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        if (document.activeElement) {
          document.activeElement.blur();
        }
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [closePopup]);

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup();
    }
  };
  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__container">
        <button onClick={closePopup} className="popup__close-button"></button>
        <h2 className="popup__title">{title}</h2>
        {children}

        {title === "Sign in" ||
        title === "Registration failed, please try again!" ? (
          <p className="popup__signup-text">
            {title === "Sign in" ? "or " : null}
            <Link
              onClick={() => openPopup(registerPopup)}
              className="popup__signup-link"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p className="popup__signup-text">
            {title === "Sign up" ? "or " : null}
            <Link
              onClick={() => openPopup(loginPopup)}
              className="popup__signup-link"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
