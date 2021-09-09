import { useState, useEffect, createContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Navigate,
  useRoutes
} from "react-router-dom";
import { positions, Provider as AlertProvider } from 'react-alert'

import ThemeConfig from './components/theme';
import DashboardLayout from './components/layouts/dashboard';
import LogoOnlyLayout from './components/layouts/LogoOnlyLayout';

import Login from './components/pages/Login';
import Register from './components/pages/Register';
import DashboardApp from './components/pages/DashboardApp';
import Products from './components/pages/Products';
import Blog from './components/pages/Blog';
import User from './components/pages/User';
import NotFound from './components/pages/Page404';

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
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
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
