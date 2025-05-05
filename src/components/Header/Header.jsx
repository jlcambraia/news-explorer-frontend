import "./Header.css";

import { useContext } from "react";
import { CurrentPathContext } from "../../contexts/CurrentPathContext";

import Navigation from "./components/Navigation";

export default function Header() {
  const pathLocation = useContext(CurrentPathContext);

  return (
    <>
      <header className={pathLocation ? "header" : "header header_black"}>
        <h1
          className={
            pathLocation ? "header__logo" : "header__logo header__logo_black"
          }
        >
          NewsExplorer
        </h1>
        <Navigation />
      </header>
    </>
  );
}
