import { useState, useEffect, createContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Navigate,
  useRoutes
} from "react-router-dom";
import { positions, Provider as AlertProvider } from 'react-alert'

import ThemeConfig from './theme';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';

import { requestApi } from './api.js'
import { Path } from './Path/index.js'
import { Paths } from './Paths/index.js'
import style from './App.module.css'

const AlertTemplate = ({ options, message }) => {
  const s = {
    info: style.alertInfo,
    success: style.alertSuccess,
    error: style.alertError
  }[options.type]
  return (
    <div className={s}>
      {message}
    </div>
  )
}

export const LoginContext = createContext()

const App = props => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    requestApi('/logged_in', 'get').then(r => {
      setLoggedIn(r.logged_in)
    })
  }, [])

  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <User /> },
        { path: 'path/:path', element: <DashboardApp /> },
        { path: 'new', element: <User /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ])

  return (
    <AlertProvider template={AlertTemplate} timeout={2000}>
      <LoginContext.Provider value={loggedIn}>
        <ThemeConfig>
          {routes}
        </ThemeConfig>
      </LoginContext.Provider>
    </AlertProvider>
  )
}
export default App
