import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Agile from "./components/Agile";
import Card from "./components/Card/index"
import Register from "./components/Register"
import Header from "./components/Header"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  render() {
    return  (
    <BrowserRouter>
      <div>
        <Header>header</Header>
      <Switch>
            <Route exact path="/" component={Agile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/card:card" component={Card} />
      </Switch>
      </div>
    </BrowserRouter>
    )
  }
}

library.add(faIgloo);


export default App;
