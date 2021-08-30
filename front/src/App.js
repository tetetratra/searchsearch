import { useState, useEffect, createContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { positions, Provider as AlertProvider } from 'react-alert'

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

  return (
    <AlertProvider template={AlertTemplate} timeout={2000}>
      <LoginContext.Provider value={loggedIn}>
        <Router>
          <Switch>
            <Route exact path="/" component={() => '工事中'} />
            <Route exact path="/search" component={Paths} />
            <Route exact path="/path/:path" component={Path} />
          </Switch>
        </Router>
      </LoginContext.Provider>
    </AlertProvider>
  )
}
export default App
