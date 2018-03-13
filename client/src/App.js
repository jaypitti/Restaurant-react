import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Item from './components/Item';
import Four from './components/Four';
import NavBar from './components/Navbar';

const App = () => (
  <div>
    <NavBar />
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/Items/:id" component={Item} />
    <Route component={Four} />
    </Switch>
  </div>
);

export default App;
