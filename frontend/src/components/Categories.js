import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

import Posts from './Posts'

import { selecionarCategoria } from '../actions/actionCreators'
import { callCarregarCategorias } from '../actions/index'

class Categories extends Component {
    componentDidMount() {
        this.props.callCarregarCategorias()
    }

    handleSelecionarCategoria = (e) => {
        e.preventDefault()

        let categoria = e.target.attributes.getNamedItem('categoria').value
        this.props.selecionarCategoria(categoria)

    //window.location = '/' + categoria
    }

    render() {
        let categorias = this.props.categorias.categorias

        return (
            <section className="categorias-wrapper">
                <h3>Categorias</h3>
                <div className='btn-group' role='group' aria-label='categorias'>
                    <Link to="/" className='btn btn-secondary'>Todas</Link>
                    {
                        categorias !== undefined && categorias.map((categoria) => (
                            <Link key={categoria.path} to="/1" className='btn btn-secondary' onClick={this.handleSelecionarCategoria} categoria={categoria.path}>{categoria.name}</Link>
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

export default connect(mapStateToProps, { callCarregarCategorias, selecionarCategoria })(Categories)