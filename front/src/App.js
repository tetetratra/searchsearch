import { useState, useEffect, createContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider as AlertProvider } from 'react-alert'

import { requestApi } from './api.js'
import { Path } from './Path/index.js'
import { Paths } from './Paths/index.js'
import { Info } from './Info/index.js'

const AlertTemplate = ({ options, message }) => {
  const style = {
    background: {
      info: '#DEF',
      success: '#DFD',
      error: '#FDD'
    }[options.type],
    width: "200px",
    height: "auto",
    margin: "10px 0 0 0",
    padding: "10px",
    borderRadius: "3px",
    textAlign: "center",
    fontSize: "18px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)"
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export const LoginContext = createContext()

const App = props => {
  const [user, setUser] = useState({})

  useEffect(() => {
    requestApi('/user_info', 'GET').then(r => {
      setUser(r)
    })
  }, [])

  return (
    <AlertProvider template={AlertTemplate} timeout={3000}>
      <LoginContext.Provider value={user}>
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Redirect to='/search'/>} />
            <Route exact path="/search" component={Paths} />
            <Route exact path="/path/:path" component={Path} />
            <Route exact path="/info" component={Info} />
          </Switch>
        </Router>
      </LoginContext.Provider>
    </AlertProvider>
  )
}
export default App

