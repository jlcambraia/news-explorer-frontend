import "./Navigation.css";
import logoutIcon from "../../../images/logout-icon.png";
import { useState } from "react";

export default function Navigation() {
  // isUserLoggedIn criado apenas para desenvolvimento. Passar para App no final do desenvolvimento do front-end.
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  return (
    <div className="navigation">
      {isUserLoggedIn ? (
        <>
          <p className="navigation__link">Home</p>
          <button className="navigation__button">Sign in</button>
        </>
      ) : (
        <>
          <p className="navigation__link">Home</p>
          <p className="navigation__link">Saved articles</p>
          <button
            onClick={handleUserLogin}
            className="navigation__button navigation__button_active"
          >
            User
            <img className="navigation__button-image" src={logoutIcon} alt="" />
          </button>
        </>
      )}
    </div>
  );
}
