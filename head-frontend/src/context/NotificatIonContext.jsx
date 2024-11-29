import React, { createContext, useContext, useState } from 'react';
import Notification from "../components/Notification/Notification";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = ({title, message, type}) => {
    if (notifications.length === 0) {
      setNotifications([{ id: Date.now(), title, message, type }]);
    }
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ showNotification, removeNotification }}>
      {children}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
