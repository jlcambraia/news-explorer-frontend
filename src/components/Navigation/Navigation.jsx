import "./Navigation.css";
import logoutIcon from "../../assets/images/icons/logout-icon.svg";
import logoutIconBlack from "../../assets/images/icons/logout-icon-black.svg";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentPathContext } from "../../contexts/CurrentPathContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Navigation({
  openPopup,
  loginPopup,
  className,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleLogout,
}) {
  const { isUserLoggedIn, currentUserInfo } = useContext(CurrentUserContext);
  const atHomepage = useContext(CurrentPathContext);

  const handleActiveLink = ({ isActive }) =>
    (atHomepage
      ? "navigation__link"
      : isMobileMenuOpen
      ? "navigation__link"
      : "navigation__link navigation__link_black") +
    (isActive
      ? atHomepage
        ? " navigation__link_active"
        : " navigation__link_active navigation__link_active_black"
      : "");

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("navigation__overlay")) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`navigation ${className}`}>
        {!isUserLoggedIn ? (
          <>
            <NavLink className={handleActiveLink} to="/">
              Início
            </NavLink>
            <button
              className={
                atHomepage
                  ? isUserLoggedIn
                    ? "navigation__button navigation__button_black"
                    : "navigation__button"
                  : isMobileMenuOpen
                  ? "navigation__button"
                  : "navigation__button navigation__button_black"
              }
              onClick={() => openPopup(loginPopup)}
            >
              Entrar
            </button>
          </>
        ) : (
          <>
            <NavLink className={handleActiveLink} to="/">
              Início
            </NavLink>
            <NavLink className={handleActiveLink} to="/saved-news">
              Artigos salvos
            </NavLink>
            <button
              className={
                atHomepage
                  ? "navigation__button navigation__button_active"
                  : isMobileMenuOpen
                  ? "navigation__button navigation__button_active"
                  : "navigation__button navigation__button_active navigation__button_black"
              }
            >
              {currentUserInfo.data.name}
              <img
                onClick={handleLogout}
                className="navigation__button-image"
                src={
                  atHomepage
                    ? logoutIcon
                    : isMobileMenuOpen
                    ? logoutIcon
                    : logoutIconBlack
                }
                alt="Ícone de logout"
              />
            </button>
          </>
        )}
      </nav>
      {className === "navigation_mobile" && (
        <div className="navigation__overlay" onClick={handleOverlayClick}></div>
      )}
    </>
  );
}
