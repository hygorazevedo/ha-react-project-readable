import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'

import Error from './Error'
import Categories from './Categories'
import Posts from './Posts'
import NewPost from './NewPost'
import Post from './Post'
import EditPost from './EditPost'
import EditComment from './EditComment'


export default class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1><Link to="/">Udacity - Reading</Link></h1>
        </header>
        <Route exact path='/' render={(props) => (
          <main>
            <Categories {...props} />
            <Posts {...props} />
          </main>
        )} />
        <Switch>
          <Route exact path='/error' component={Error} />
          <Route exact path='/:category' render={(props) => (
            <main>
              <Categories {...props} />
              <Posts {...props} />
            </main>
          )} />
          <Route exact path='/postagens/criar' component={NewPost} />
          <Route exact path='/:categoria/:id' component={Post} />
          <Route exact path='/postagens/:id/editar' component={EditPost} />
          <Route exact path='/comentarios/:id/editar' component={EditComment} />
        </Switch>
      </div>
    )
  }
}