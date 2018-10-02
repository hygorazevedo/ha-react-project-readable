import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callCarregarPostagem, callCarregarComentarios, callCriarComentario, callExcluirComentario, callVotar } from '../actions'
import { connect } from 'react-redux'
import Moment from 'moment'
import sortBy from 'sort-by'

class Comentarios extends Component {
  state = {
    ordem: 'voteScore',
    id:''
  }

  componentDidMount() {
    this.props.callCarregarComentarios(this.props.match.params.postagem)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.comentario.comentario.deleted || nextProps.comentario.comentario['error']) {
      this.props.history.push('/error-404')
    }
  }

  handleCriarComentario = (e) => {
    e.preventDefault()

    let comentario = {
      id: Date.now(),
      parentId: this.props.match.params.postagem,
      timestamp: Date.now(),
      author: e.target.autor.value,
      body: e.target.corpo.value,
    }
    this.props.callCriarComentario(comentario)
    this.props.history.go(`${this.props.location.pathname}`)
  }

  handleExcluirComentario = (id) => {
    let confirm = window.confirm('Deseja mesmo excluir este registro?')

    if(confirm === true) {
      this.props.callExcluirComentario(id)
    }

    this.props.history.go(`${this.props.location.pathname}`)
  }

  handleVotar = (id, option) => {
    let data = {
      option: option
    }

    this.props.callVotar(id, data, 'comments')
  }

  render() {
    let comentarios = this.props.comentarios.comentarios

    comentarios.sort(sortBy(`-${this.state.ordem}`))
    return (
      <section className="comentarios-wrapper">
        <ul>
          {comentarios !== undefined && comentarios.map((comentario) => (
            <li key={comentario.id} className="comentario">
              <div><b>{comentario.author} em {Moment.unix(comentario.timestamp/1000).format('DD/MM/YYYY')}:</b></div>
              <div className="comentario-body">
                {comentario.body}
              </div>
              <div className="comentario-footer">
                <div>
                  <Link className="btn btn-primary" to={`/${this.props.match.params.categoria}/${this.props.match.params.postagem}/${comentario.id}/editar`}>
                    <span className="glyphicon glyphicon-pencil"/>
                  </Link>
                  <button className="btn btn-danger" onClick={() => this.handleExcluirComentario(comentario.id)}>
                    <span className="glyphicon glyphicon-trash"/>
                  </button>
                </div>
                <div className="votes-wrapper">
                  <span>{comentario.voteScore} votos</span>
                  <button className="btn btn-success" onClick={() => this.handleVotar(comentario.id, 'upVote')}>
                    <span className="glyphicon glyphicon-thumbs-up"/>
                  </button>
                  <button className="btn btn-warning" onClick={() => this.handleVotar(comentario.id, 'downVote')}>
                    <span className="glyphicon glyphicon-thumbs-down"/>
                  </button>
                </div>
              </div>
              <hr/>
            </li>
          ))}
        </ul>
        <hr/>
        <form className="comentario-form" onSubmit={this.handleCriarComentario}>
          <div style={{'marginBottom':'10px'}}><b>Comentar</b></div>
          <input name="autor" type="text" placeholder="Autor" style={{'marginBottom':'10px'}} required/>
          <br/>
          <textarea name="corpo" placeholder="Corpo do comentário" required/>
          <br/>
          <button className="btn btn-default">Comentar</button>
        </form>
      </section>
    )
  }
}

const mapStateToProps = ({ comentarios, comentario, ordem, postagem }) => ({
  comentarios,
  comentario,
  ordem,
  postagem
})

export default connect(mapStateToProps, { callCarregarPostagem, callCarregarComentarios, callCriarComentario, callExcluirComentario, callVotar })(Comentarios)