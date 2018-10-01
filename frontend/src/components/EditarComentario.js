import React, { Component } from 'react'
import { callEditarComentario, callCarregarComentario } from '../actions'
import { connect } from 'react-redux'
import queryString from 'query-string'

class EditarComentario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      body: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search)
    this.props.callCarregarComentario(query.id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.comentario.comentario.deleted || nextProps.comentario.comentario['error']) {
      this.props.history.push('/error-404')
    }

    let comentario = nextProps.comentario.comentario
    this.setState({
      author: comentario.author,
      body: comentario.body
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let comentario = {
      id: this.props.comentario.comentario.id,
      parentId: this.props.comentario.comentario.parentId,
      timestamp: this.props.comentario.comentario.timestamp,
      author: this.state.author,
      body: this.state.body
    }
    this.props.callEditarComentario(comentario)

    this.props.history.push(`/postagem?id=${this.props.comentario.comentario.parentId}`)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBack = (event) => {
    this.props.history.push(`/postagem?id=${this.props.comentario.comentario.parentId}`)
  }

  render() {
    return (
      <main>
        <section className="main-content">
          <button className="btn btn-default" onClick={this.handleBack}>Voltar</button>
          <h3 className="post-form-title">Editar Comentário</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form row">
              <div className="col-md-4 mb-3">
                <label htmlFor="autor">Autor</label>
                <input
                  className="form-control"
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Author"
                  required
                  value={this.state.author}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-9 mb-3">
                <label htmlFor="corpo">Corpo</label>
                <textarea
                  className="form-control"
                  id="body"
                  name="body"
                  value={this.state.body}
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

const mapStateToProps = ({ comentario, comentarios }) => ({
  comentario,
  comentarios
})

export default connect(mapStateToProps, { callCarregarComentario, callEditarComentario })(EditarComentario)