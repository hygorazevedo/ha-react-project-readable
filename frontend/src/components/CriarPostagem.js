import React, { Component } from 'react'
import {  callCarregarCategorias, callCriarPostagem } from '../actions'
import { connect } from 'react-redux'
import { capitalize } from '../utils/helpers'

class CriarPostagem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      autor: '',
      categoria: '',
      corpo: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this)
  }
  
  componentDidMount() {
    this.props.callCarregarCategorias()
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let postagem = {
      id: Date.now(),
      timestamp: Date.now(),
      author: this.state.autor,
      body: this.state.corpo,
      title: this.state.titulo,
      category: this.state.categoria
    }

    this.props.callCriarPostagem(postagem)

    this.props.history.push('/')
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  render() {
    let categorias = this.props.categorias.categorias

    return (
      <main>
        <section className="main-content">
          <button className="btn btn-default" onClick={this.handleBack}>Voltar</button>
          <h3>Criar Postagem</h3>
          <form onSubmit={this.handleSubmit}>
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="categoria">Categoria</label>
                <select 
                  className="form-control" 
                  name="categoria" 
                  required
                  value={this.state.categoria}
                  onChange={this.handleChange}
                >
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
                  required
                  value={this.state.corpo}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <button className="btn btn-default">Criar</button>
            </div>
          </form>
        </section>
      </main>
    )
  }
}

const mapStateToProps = ({ categorias }) => ({
  categorias
})

export default connect(mapStateToProps, { callCarregarCategorias, callCriarPostagem })(CriarPostagem)