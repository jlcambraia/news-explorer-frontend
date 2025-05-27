import "./Header.css";

import { useContext, useState, useEffect } from "react";
import { CurrentPathContext } from "../../contexts/CurrentPathContext";
import { useNavigate } from "react-router-dom";

import Navigation from "../Navigation/Navigation";

export default function Header({
  openPopup,
  loginPopup,
  handleLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const [isMobile, setisMobile] = useState(window.innerWidth <= 543);

  const atHomepage = useContext(CurrentPathContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setisMobile(window.innerWidth <= 543);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleOpenMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("header__overlay")) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div className="header__overlay" onClick={handleOverlayClick}></div>
      )}
      <header
        className={
          atHomepage
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
            atHomepage
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
              atHomepage
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
            handleLogout={handleLogout}
            className="navigation_desktop"
          />
        )}

        {isMobile && isMobileMenuOpen && (
          <Navigation
            openPopup={openPopup}
            loginPopup={loginPopup}
            isMobileMenuOpen={isMobileMenuOpen}
            isMobile={isMobile}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            handleLogout={handleLogout}
            className="navigation_mobile"
          />
        )}
      </header>
    </>
  );
}
