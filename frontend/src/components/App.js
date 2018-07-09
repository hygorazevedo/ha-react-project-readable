import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import Categories from './Categories'

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1><Link to="/">Reaccit</Link></h1>
        </header>
        <Route exact path='/' render={(props) => (
          <main>
            <Categories {...props} />
          </main>
        )} />
      </div>
    )
  }
}