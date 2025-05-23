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
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__wrapper")
    ) {
      closePopup();
    }
  };

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__wrapper" onClick={handleOverlayClick}>
        <div className="popup__container">
          <button onClick={closePopup} className="popup__close-button" />
          <h2 className="popup__title">{title}</h2>
          {children}

          {(title === "Entrar" ||
            title === "O cadastro falhou, por favor, tente novamente.") && (
            <p className="popup__signup-text">
              {title === "Entrar" && "ou "}
              <Link
                onClick={() => openPopup(registerPopup)}
                className="popup__signup-link"
              >
                Inscreva-se
              </Link>
            </p>
          )}

          {(title === "Inscrever-se" ||
            title === "Cadastro concluído com sucesso!") && (
            <p className="popup__signup-text">
              {title === "Inscrever-se" && "ou "}
              <Link
                onClick={() => openPopup(loginPopup)}
                className="popup__signup-link"
              >
                Entre
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
