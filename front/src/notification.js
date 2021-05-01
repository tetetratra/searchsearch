import { createContext, useRef } from 'react';
// import NotificationSystem from 'react-notification-system';

export const NotificationContext = createContext() // 子コンポーネント側でこれをimportしてuseContextで使う

export const Notification = ({ children }) => { // App.jsでこれをimportする
  // const notificationSystem = useRef()
  const notificationApi = {
    success: message => console.log({ // notificationSystem.current.addNotification({
      message: message,
      dismissible: 'click',
      level: 'success',
      autoDismiss: 2
    }),
    error: message => console.log({ // notificationSystem.current.addNotification({
      message: message,
      dismissible: 'click',
      level: 'error',
      autoDismiss: 4
    })
  }

  return (
    <NotificationContext.Provider value={notificationApi}>
      {/* <NotificationSystem ref={notificationSystem} /> */}
      {children}
    </NotificationContext.Provider>
  )
}
