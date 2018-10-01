import React, { Component } from 'react'
import { callCarregarCategorias, callEditarPostagem, callCarregarPostagem } from '../actions'
import { connect } from 'react-redux'
import { capitalize } from '../utils/helpers'
import queryString from 'query-string'

class EditarPostagem extends Component {
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
    const query = queryString.parse(this.props.location.search)

    this.props.callCarregarCategorias()
    this.props.callCarregarPostagem(query.id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.postagem.postagem.deleted || nextProps.postagem.postagem['error']) {
      this.props.history.push('/error-404')
    }

    let postagem = nextProps.postagem.postagem
    this.setState({
      titulo: postagem.title,
      autor: postagem.author,
      categoria: postagem.category,
      corpo: postagem.body
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let postagem = this.props.postagem.postagem
    postagem.author = this.state.autor
    postagem.body = this.state.corpo
    postagem.title = this.state.titulo
    postagem.category = this.state.categoria
    
    this.props.callEditarPostagem(postagem)
    
    this.props.history.push(`/postagem?id=${this.props.postagem.postagem.id}`)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBack = (event) => {
    this.props.history.push(`/postagem?id=${this.props.postagem.postagem.id}`)
  }

  render() {
    return (
      <main>
        <section className="main-content">
          <button className="btn btn-default" onClick={this.handleBack}>Voltar</button>
          <h3>Editar Postagem</h3>
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
                <select className="form-control" name="categoria" value={this.state.categoria} onChange={this.handleChange}>
                  <option value="">Selecione</option>
                  {this.props.categorias.categorias !== undefined && this.props.categorias.categorias.map((categoria) => (
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
                  onChange={this.handleChange}
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