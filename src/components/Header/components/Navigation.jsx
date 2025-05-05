import "./Navigation.css";
import logoutIcon from "../../../images/logout-icon.png";
import logoutIconBlack from "../../../images/logout-icon-black.png";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentPathContext } from "../../../contexts/CurrentPathContext";

export default function Navigation() {
  // isUserLoggedIn criado apenas para desenvolvimento. Passar para App no final do desenvolvimento do front-end.
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const pathLocation = useContext(CurrentPathContext);

  const handleActiveLink = ({ isActive }) =>
    (pathLocation
      ? "navigation__link"
      : "navigation__link navigation__link_black") +
    (isActive
      ? pathLocation
        ? " navigation__link_active"
        : " navigation__link_active navigation__link_active_black"
      : "");

  return (
    <div className="navigation">
      {!isUserLoggedIn ? (
        <>
          <NavLink className={handleActiveLink} to="/">
            Home
          </NavLink>
          <button
            className={
              pathLocation ? "navigation__button" : "navigation__button_black"
            }
          >
            Sign in
          </button>
        </>
      ) : (
        <>
          <NavLink className={handleActiveLink} to="/">
            Home
          </NavLink>
          <NavLink className={handleActiveLink} to="/saved-news">
            Saved articles
          </NavLink>
          <button
            className={
              pathLocation
                ? "navigation__button navigation__button_active"
                : "navigation__button navigation__button_black navigation__button_active navigation__button_active_black"
            }
          >
            User
            <img
              className="navigation__button-image"
              src={pathLocation ? logoutIcon : logoutIconBlack}
              alt=""
            />
          </button>
        </>
      )}
    </div>
  );
}
