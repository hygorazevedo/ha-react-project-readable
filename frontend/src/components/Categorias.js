import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from '../utils/helpers'
import { 
  callCarregarCategorias, 
  callCarregarPostagens,
  callCarregarPostagensPorCategoria, 
  selecionarCategoria } from '../actions'
import { connect } from 'react-redux'

class CategoriasList extends Component {
  componentDidMount() {
    this.props.callCarregarCategorias()
  }

  handleSelecionarCategoria = (e) => {
    e.preventDefault()
    
    let categoria = e.target.attributes.getNamedItem('categoria').value

    this.props.selecionarCategoria(categoria)

    if(categoria === 'all') {
      this.props.callCarregarPostagens()
    } else {
      this.props.callCarregarPostagensPorCategoria(categoria)
    }
  }

  render() {
    let categorias = this.props.categorias.categorias

    return (
      <section className="categorias-wrapper">
        <h3>Categorias</h3>
        <div className="btn-group">
          <Link to="#" onClick={this.handleSelecionarCategoria} categoria='all' className="btn btn-secondary">Todas</Link>
          {
            categorias !== undefined && categorias.map((categoria) => (
              <Link to="#" className="btn btn-secondary" key={categoria.name} onClick={this.handleSelecionarCategoria} categoria={categoria.path}>{capitalize(categoria.name)}</Link>
            ))
          }
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ categoria, categorias }) => ({
  categoria,
  categorias
})

export default connect(mapStateToProps, { 
  callCarregarCategorias, 
  callCarregarPostagens, 
  callCarregarPostagensPorCategoria, 
  selecionarCategoria })(CategoriasList)