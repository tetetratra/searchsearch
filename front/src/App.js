import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Search } from './queryString/Search'
import { New } from './queryString/New'
import { Notification } from './notification'

const App = props => {
  return (
    <Notification>
      <Router>
        <Switch>
          <Route exact path="/search" component={Search} />
          <Route exact path="/new" component={New} />
        </Switch>
      </Router>
    </Notification>
  )
}
export default App;
