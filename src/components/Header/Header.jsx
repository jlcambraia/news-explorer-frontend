import "./Header.css";

import { useContext, useState, useEffect } from "react";
import { CurrentPathContext } from "../../contexts/CurrentPathContext";
import { useNavigate } from "react-router-dom";

import Navigation from "./components/Navigation";

export default function Header({ openPopup, loginPopup, isUserLoggedIn }) {
  const [isMobile, setisMobile] = useState(window.innerWidth <= 320);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathLocation = useContext(CurrentPathContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setisMobile(window.innerWidth <= 320);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleOpenMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <>
      {isMobile && isMobileMenuOpen && (
        <div className="header__overlay" onClick={handleOpenMobileMenu} />
      )}
      <header
        className={
          pathLocation
            ? isMobile && isMobileMenuOpen
              ? "header header_mobile "
              : "header"
            : isMobile && isMobileMenuOpen
            ? "header header_mobile"
            : "header header_black"
        }
      >
        <h1
          onClick={() => navigate("/")}
          className={
            pathLocation
              ? "header__logo"
              : isMobile && isMobileMenuOpen
              ? "header__logo"
              : "header__logo header__logo_black"
          }
        >
          NewsExplorer
        </h1>

        {isMobile && (
          <button
            onClick={handleOpenMobileMenu}
            className={
              pathLocation
                ? isMobileMenuOpen
                  ? "header__mobile-menu-button header__mobile-menu-close-button"
                  : "header__mobile-menu-button"
                : !isMobileMenuOpen
                ? "header__mobile-menu-button header__mobile-menu-button_black"
                : "header__mobile-menu-button header__mobile-menu-close-button"
            }
          />
        )}

        {!isMobile && (
          <Navigation
            openPopup={openPopup}
            loginPopup={loginPopup}
            isUserLoggedIn={isUserLoggedIn}
            className="navigation_desktop"
          />
        )}

        {isMobile && isMobileMenuOpen && (
          <Navigation
            openPopup={openPopup}
            loginPopup={loginPopup}
            isMobileMenuOpen={isMobileMenuOpen}
            isMobile={isMobile}
            isUserLoggedIn={isUserLoggedIn}
            className="navigation_mobile"
          />
        )}
      </header>
    </>
  );
}
