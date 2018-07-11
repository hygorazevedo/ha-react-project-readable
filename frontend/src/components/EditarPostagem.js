import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callCarregarCategorias, callEditarPostagem, callCarregarPostagem } from '../actions'
import { connect } from 'react-redux'
import { capitalize } from '../utils/helpers'

class EditarPostagem extends Component {
  state = {
    titulo: '',
    autor: '',
    categoria: '',
    corpo: ''
  }

  componentDidMount() {
    this.props.callCarregarCategorias()
    this.props.callCarregarPostagem(this.props.match.params.id)

    let postagem = this.props.postagem.postagem

    this.setState({
      titulo: postagem.title,
      autor: postagem.author,
      categoria: postagem.category,
      corpo: postagem.body
    })
  }

  componentWillReceiveProps(nextProps) {
    let postagem = nextProps.postagem.postagem

    this.setState({
      titulo: postagem.title,
      autor: postagem.author,
      categoria: postagem.category,
      corpo: postagem.body
    })
  }

  handleEditarPostagem = (e) => {
    e.preventDefault()

    let postagem = {
      id: this.props.match.params.id,
      timestamp: Date.now(),
      author: e.target.autor.value,
      body: e.target.corpo.value,
      title: e.target.titulo.value,
      category: e.target.categoria.value
    }

    this.props.callEditarPostagem(postagem)

    window.location = '/'
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let categorias = this.props.categorias.categorias

    return (
      <main>
        <div className="voltar-btn-wrapper">
          <button className="btn btn-default"><Link to="/">Voltar</Link></button>
        </div>
        <section className="main-content">
          <h3>Editar Postagem</h3>
          <form onSubmit={this.handleEditarPostagem}>
          <div className="form row">
            <div className="col-md-3 mb-3">
              <label htmlFor="titulo">Título</label>
              <input
                className="form-control"
                id="titulo"
                name="titulo"
                type="text"
                placeholder="Título"
                required
                value={this.state.titulo}
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="autor">Autor</label>
              <input
                className="form-control"
                id="autor"
                name="autor"
                type="text"
                placeholder="Autor"
                required
                value={this.state.autor}
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="categoria">Categoria</label>
              <select className="custom-select" name="categoria" value={this.state.categoria} onChange={(e) => this.handleInput(e)}>
                <option value="">Selecione</option>
                {categorias !== undefined && categorias.map((categoria) => (
                  <option key={categoria.name} value={categoria.path}>{capitalize(categoria.name)}</option>
                ))}
              </select>
            </div>
            <div className="col-md-9 mb-3">
              <label htmlFor="corpo">Corpo</label>
              <textarea
                className="form-control"
                id="corpo"
                name="corpo"
                value={this.state.corpo} 
                onChange={(e) => this.handleInput(e)}
              />
            </div>
          </div>
            <div className="form-group">
              <button className="btn btn-default">Editar</button>
            </div>
          </form>
        </section>
      </main>
    )
  }
}

const mapStateToProps = ({ categorias, postagem }) => ({
  categorias,
  postagem
})

export default connect(mapStateToProps, { callCarregarCategorias, callEditarPostagem, callCarregarPostagem })(EditarPostagem)