import { useState, useEffect, createContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { positions, Provider as AlertProvider } from 'react-alert'

import { requestApi } from './api.js'
import { Search } from './Search/index.js'
import { New } from './New/index.js'
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
            <Route exact path="/" component={Search} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/new" component={New} />
          </Switch>
        </Router>
      </LoginContext.Provider>
    </AlertProvider>
  )
}
export default App;
