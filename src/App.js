import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch } from 'react-router-dom'
import IndexRoute from 'routes/IndexRoute'

function App() {
  return (
    <Router>
      <div className="App">
        {/* Router */}
        <Switch>
          <IndexRoute />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
