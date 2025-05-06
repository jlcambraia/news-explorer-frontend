import "./Header.css";

import { useContext } from "react";
import { CurrentPathContext } from "../../contexts/CurrentPathContext";
import { useNavigate } from "react-router-dom";

import Navigation from "./components/Navigation";

export default function Header({ openPopup, loginPopup }) {
  const pathLocation = useContext(CurrentPathContext);
  const navigate = useNavigate();

  return (
    <>
      <header className={pathLocation ? "header" : "header header_black"}>
        <h1
          onClick={() => navigate("/")}
          className={
            pathLocation ? "header__logo" : "header__logo header__logo_black"
          }
        >
          NewsExplorer
        </h1>
        <Navigation openPopup={openPopup} loginPopup={loginPopup} />
      </header>
    </>
  );
}
