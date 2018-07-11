import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callEditarComentario, callCarregarComentario } from '../actions'
import { connect } from 'react-redux'

class EditarComentario extends Component {
  state = {
    autor: '',
    corpo: ''
  }

  componentDidMount() {
    this.props.callCarregarComentario(this.props.match.params.id)

    let comentario = this.props.comentario.comentario

    this.setState({
      autor: comentario.author,
      corpo: comentario.body
    })
  }

  componentWillReceiveProps(nextProps) {
    let comentario = nextProps.comentario.comentario

    if(comentario.deleted === true) {
      window.location = '/erro404'
    }

    this.setState({
      autor: comentario.author,
      corpo: comentario.body
    })
  }

  handleEditarComentario = (e) => {
    e.preventDefault()

    let comentario = {
      id: this.props.match.params.id,
      parentId: this.props.comentario.comentario.parentId,
      timestamp: Date.now(),
      author: e.target.autor.value,
      body: e.target.corpo.value,
    }

    this.props.callEditarComentario(comentario)

    window.location = '/postagens/' + this.props.comentario.comentario.parentId
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <main>
        <div className="voltar-btn-wrapper">
          <button className="btn btn-default"><Link to="/postagem/${}">Voltar</Link></button>
        </div>
        <section className="main-content">
          <h3 className="post-form-title">Editar Comentário</h3>
          <form onSubmit={this.handleEditarComentario}>
          <div className="form row">
            <div className="col-md-4 mb-3">
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

const mapStateToProps = ({ comentario }) => ({
  comentario
})

export default connect(mapStateToProps, { callCarregarComentario, callEditarComentario })(EditarComentario)