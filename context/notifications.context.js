import { createContext, useContext } from "react";

const NotificationsContext = createContext();

export const NotificationsProvider = () => {
  return (
    <NotificationsContext.Provider value={{}}></NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const notifications = useContext(NotificationsContext);
  return notifications;
};
