import { useState } from "react";

export const usePopup = () => {
  const [popup, setPopup] = useState(null);

  const handleOpenPopup = (popupConfig) => {
    setPopup(popupConfig);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };

  return {
    popup,
    handleOpenPopup,
    handleClosePopup,
  };
};
