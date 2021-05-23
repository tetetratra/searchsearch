import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { positions, Provider as AlertProvider } from 'react-alert'

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

const App = props => {
  return (
    <AlertProvider template={AlertTemplate} timeout={2000}>
      <Router>
        <Switch>
          <Route exact path="/search" component={Search} />
          <Route exact path="/new" component={New} />
        </Switch>
      </Router>
    </AlertProvider>
  )
}
export default App;
