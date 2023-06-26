import { useState } from "react";

const useNotifications = () => {
  const [menuShown, setMenuShown] = useState(false);

  const showMenu = () => setMenuShown(true);

  const hideMenu = () => setMenuShown(false);

  const toggleMenu = () => setMenuShown(!menuShown);

  return {
    menuShown,
    showMenu,
    hideMenu,
    toggleMenu,
  };
};

export default useNotifications;
