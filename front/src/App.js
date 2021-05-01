import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Search } from './queryString/Search'
import { Show } from './queryString/Show'
import { Notification } from './notification'

const App = props => {
  return (
    <Notification>
      <Router>
        <Switch>
          <Route exact path="/search" component={Search} />
          <Route path="/qs/:url" component={Show} />
        </Switch>
      </Router>
    </Notification>
  )
}

export default App;
