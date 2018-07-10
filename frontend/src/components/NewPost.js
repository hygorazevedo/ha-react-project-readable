import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
    callCarregarCategorias,
    callCriarPostagem
} from '../actions/index'

class NewPost extends Component {
    componentDidMount() {
        this.props.callCarregarCategorias()
    }

    handleCriarPostagem = (e) => {
        e.preventDefault()
        
        let postagem = {
            id: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            timestamp: Date.now(),
            title: e.target.titulo.value,
            body: e.target.corpo.value,
            author: e.target.autor.value,
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
                    <button><Link to="/">Voltar</Link></button>
                </div>
                <section className="main-content">
                    <h3 className="post-form-title">Criar Postagem</h3>
                    <form className="post-form" onSubmit={ this.handleCriarPostagem }>
                        <div className="form-group">
                            <label>Título:</label>
                            <input
                                name="titulo"
                                type="text"
                                placeholder="Título"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Autor:</label>
                            <input
                                name="autor"
                                type="text"
                                placeholder="Autor"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Categoria:</label>
                            <select name="categoria">
                                <option value="">Selecione</option>
                                {categorias !== undefined && categorias.map((categoria) => (
                                    <option key={ categoria.path } value={ categoria.path }>{ categoria.name }</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Corpo:</label>
                            <textarea
                                name="corpo"
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <button>Criar</button>
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

export default connect(mapStateToProps, { callCarregarCategorias, callCriarPostagem })(NewPost)