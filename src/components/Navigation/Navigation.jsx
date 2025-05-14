import "./Navigation.css";
import logoutIcon from "../../assets/images/icons/logout-icon.png";
import logoutIconBlack from "../../assets/images/icons/logout-icon-black.png";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentPathContext } from "../../contexts/CurrentPathContext";

export default function Navigation({
  openPopup,
  loginPopup,
  className,
  isMobileMenuOpen,
  isUserLoggedIn,
}) {
  const pathLocation = useContext(CurrentPathContext);

  const handleActiveLink = ({ isActive }) =>
    (pathLocation
      ? "navigation__link"
      : isMobileMenuOpen
      ? "navigation__link"
      : "navigation__link navigation__link_black") +
    (isActive
      ? pathLocation
        ? " navigation__link_active"
        : " navigation__link_active navigation__link_active_black"
      : "");

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
                pathLocation
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
                pathLocation
                  ? "navigation__button navigation__button_active"
                  : isMobileMenuOpen
                  ? "navigation__button navigation__button_active"
                  : "navigation__button navigation__button_active navigation__button_black"
              }
            >
              User
              <img
                className="navigation__button-image"
                src={
                  pathLocation
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
        <div className="navigation__overlay"></div>
      )}
    </>
  );
}
