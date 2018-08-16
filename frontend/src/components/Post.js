import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callCarregarPostagem, callCarregarComentarios, callExcluirPostagem, callVotar } from '../actions'
import { connect } from 'react-redux'
import { capitalize } from '../utils/helpers'
import Moment from 'moment'
import Comentarios from './Comentarios'
import { Button, Glyphicon } from 'react-bootstrap'

class Post extends Component {
  componentDidMount() {
    this.props.callCarregarPostagem(this.props.match.params.id)
    this.props.callCarregarComentarios(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    let postagem = nextProps.postagem.postagem

    if(postagem.deleted === true) {
      window.location = '/erro404'
    }
  }

  handleExcluirPostagem = (id) => {
    let confirm = window.confirm('Deseja mesmo excluir este registro?')

    if(confirm === true) {
      this.props.callExcluirPostagem(id)

      window.location = '/'
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
        <div className="voltar-btn-wrapper">
          <button className="btn btn-default"><Link to="/">Voltar</Link></button>
        </div>
        <section className="post-wrapper">
          <div className="post-header">
            <div>
              <h3>{postagem.title}</h3>
              <span className="small">
                Por {postagem.author} em {Moment.unix(postagem.timestamp/1000).format('DD/MM/YYYY')}
              </span>
              <Link className="btn btn-info" to="#">
                {postagem.category !== undefined && capitalize(postagem.category)}
              </Link>
            </div>
            <div className="votes-wrapper">
              <span>{comentarios.length} comentarios | </span>
              <span>{postagem.voteScore} votos</span>
              <Button bsStyle="success" onClick={() => this.handleVotar(postagem.id, 'upVote')}>
                <Glyphicon glyph="thumbs-up"/>
              </Button>
              <Button bsStyle="warning" onClick={() => this.handleVotar(postagem.id, 'downVote')}>
                <Glyphicon glyph="thumbs-down"/>
              </Button>
            </div>
          </div>
          <hr/>
          <div className="post-body">
            {postagem.body}
          </div>
          <div>
            <Button bsStyle="primary"><Link to={`/postagens/${postagem.id}/editar`}>Editar</Link></Button>
            <Button bsStyle="danger" onClick={() => this.handleExcluirPostagem(postagem.id)}>Excluir</Button>
          </div>
          <hr/>
        </section>
        <Comentarios id={this.props.match.params.id}/>
      </main>
    )
  }
}

const mapStateToProps = ({ postagem, comentarios }) => ({
  postagem,
  comentarios
})

export default connect(mapStateToProps, { callCarregarPostagem, callCarregarComentarios, callExcluirPostagem, callVotar })(Post)