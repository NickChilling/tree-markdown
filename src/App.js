import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './screen/Login';
import Editor from './screen/Editor';
import Logout from './screen/Logout';
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout}/>
          <Route path="/" component={Editor} />
        </Switch>
      </Router>  
    );
  }
}

export default App;