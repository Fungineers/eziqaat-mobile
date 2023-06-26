import { useState } from "react";

const usePopup = () => {
  const [shown, setShown] = useState(false);

  const show = () => setShown(true);

  const hide = () => setShown(false);

  return { shown, show, hide };
};

export default usePopup;
