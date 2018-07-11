import React, { Component } from 'react'
import '../index.css'
import { Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Categorias from './Categorias'
import PostsTable from './PostsTable'
import CriarPostagem from './CriarPostagem'
import EditarPostagem from './EditarPostagem'
import EditarComentario from './EditarComentario'
import Post from './Post'
import Error from './Error'

class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1><Link to="/">Udacity - Leitura</Link></h1>
        </header>
        <Route exact path='/' render={(props) => (
          <main>
            <Categorias {...props}/>
            <PostsTable {...props}/>
          </main>
        )}/>
        <Switch>
          <Route exact path='/error' component={Error}/>
          <Route exact path='/:categoria' render={(props) => (
            <main>
              <Categorias {...props}/>
              <PostsTable {...props}/>
            </main>
          )}/>
          <Route exact path='/postagens/criar' component={CriarPostagem}/>
          <Route exact path='/:categoria/:id' component={Post}/>
          <Route exact path='/postagens/:id/editar' component={EditarPostagem}/>
          <Route exact path='/comentarios/:id/editar' component={EditarComentario}/>
        </Switch>
      </div>
    );
  }
}

export default App;