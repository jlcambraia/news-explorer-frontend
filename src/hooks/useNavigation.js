import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useNavigation = () => {
  const location = useLocation();
  const [atHomepage, setAtHomepage] = useState(location.pathname === "/");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setAtHomepage(location.pathname === "/");
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return {
    atHomepage,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    closeMobileMenu,
  };
};
