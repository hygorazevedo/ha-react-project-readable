import React, { Component } from 'react'
import '../index.css'
import { Link, Route, Switch } from 'react-router-dom'
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
        <Route exact path='/error-404' component={Error} />
          <Route exact path='/:categoria' render={(props) => (
            <main>
              <Categorias {...props}/>
              <PostsTable {...props}/>
            </main>
          )}/>
          <Route exact path='/postagem/criar' render={props => <CriarPostagem {...props} />}/>
          <Route exact path='/:categoria/:postagem' render={props => <Post {...props}/> } />
          <Route exact path='/:categoria/:postagem/editar' render={props => <EditarPostagem {...props} />} />
          <Route exact path='/:categoria/:postagem/:comentario/editar' render={props => <EditarComentario {...props} />}/>
          
        </Switch>
      </div>
    );
  }
}

export default App;