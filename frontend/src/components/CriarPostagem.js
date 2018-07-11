import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {  callCarregarCategorias, callCriarPostagem } from '../actions'
import { connect } from 'react-redux'
import { capitalize } from '../utils/helpers'

class CriarPostagem extends Component {
  componentDidMount() {
    this.props.callCarregarCategorias()
  }

  handleCriarPostagem = (e) => {
    e.preventDefault()

    let postagem = {
      id: Date.now(),
      timestamp: Date.now(),
      author: e.target.autor.value,
      body: e.target.corpo.value,
      title: e.target.titulo.value,
      category: e.target.categoria.value
    }

    this.props.callCriarPostagem(postagem)

    window.location = '/'
  }

  render() {
    let categorias = this.props.categorias.categorias

    return (
      <main>
        <div className="voltar-btn-wrapper">
          <button className="btn btn-default"><Link to="/">Voltar</Link></button>
        </div>
        <section className="main-content">
          <h3>Criar Postagem</h3>
          <form onSubmit={this.handleCriarPostagem}>
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
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="categoria">Categoria</label>
                <select className="custom-select" name="categoria">
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