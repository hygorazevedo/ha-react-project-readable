import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callCarregarPostagem, callCarregarComentarios, callExcluirPostagem, callVotar } from '../actions'
import { connect } from 'react-redux'
import Moment from 'moment'
import Comentarios from './Comentarios'

class Post extends Component {
  componentDidMount() {
    this.props.callCarregarPostagem(this.props.match.params.postagem)
    this.props.callCarregarComentarios(this.props.match.params.postagem)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.postagem.postagem.deleted || nextProps.postagem.postagem['error']) {
      this.props.history.push('/error-404')
    }
  }

  handleExcluirPostagem = (id) => {
    let confirm = window.confirm('Deseja mesmo excluir este registro?')

    if (confirm === true) {
      this.props.callExcluirPostagem(id)

      this.props.history.push('/')
    }
  }

  handleVotar = (id, option) => {
    let data = {
      option: option
    }

    this.props.callVotar(id, data, 'posts', true)
  }

  render() {
    let postagem = this.props.postagem.postagem
    let comentarios = this.props.comentarios.comentarios

    return (
      <main>
        <section className="post-wrapper">
          <Link className="btn btn-default" to='/'>Voltar</Link>
          <div className="post-header">
            <div>
              <h3>{postagem.title}</h3>
            </div>
            <div className="votes-wrapper">
              <span>{comentarios.length} comentarios | </span>
              <span>{postagem.voteScore} votos</span>
              <button className="btn btn-success" onClick={() => this.handleVotar(postagem.id, 'upVote')}>
                <span className="glyphicon glyphicon-thumbs-up" />
              </button>
              <button className="btn btn-warning" onClick={() => this.handleVotar(postagem.id, 'downVote')}>
                <span className="glyphicon glyphicon-thumbs-down" />
              </button>
            </div>
          </div>
          <div className="post-body">
            {postagem.body}
            <div className='pull-right'>
              <span className="small">
                Por {postagem.author} em {Moment.unix(postagem.timestamp / 1000).format('DD/MM/YYYY')}
              </span>
            </div>
          </div>
          <div>
            <Link className="btn btn-primary" to={`${this.props.location.pathname}/editar`}>
              <span className="glyphicon glyphicon-pencil"/>
            </Link>
            <button className="btn btn-danger" onClick={() => this.handleExcluirPostagem(postagem.id)}>
              <span className="glyphicon glyphicon-trash"/>
            </button>
          </div>
          <hr />
        </section>
        <Comentarios {...this.props} />
      </main>
    )
  }
}

const mapStateToProps = ({ postagem, comentarios }) => ({
  postagem,
  comentarios
})

export default connect(mapStateToProps, { callCarregarPostagem, callCarregarComentarios, callExcluirPostagem, callVotar })(Post)