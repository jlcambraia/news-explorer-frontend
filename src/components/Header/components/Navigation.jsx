import "./Navigation.css";
import logoutIcon from "../../../images/logout-icon.png";
import { useState } from "react";

export default function Navigation() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  // Função criada apenas para ajudar no desenvolvimento. Deve ser excluída ao final do desenvolvimento.
  function handleUserLogin() {
    setIsUserLoggedIn(!isUserLoggedIn);
  }

  return (
    <div className="navigation">
      {isUserLoggedIn ? (
        <>
          <p className="navigation__link">Home</p>
          <button onClick={handleUserLogin} className="navigation__button">
            Sign in
          </button>
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
