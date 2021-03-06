import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { callCarregarPostagens, callCarregarPostagensPorCategoria, callExcluirPostagem, selecionarOrdem, callVotar } from '../actions'
import Moment from 'moment'
import sortBy from 'sort-by'
import { Table } from 'react-bootstrap'

class PostsTable extends Component {
  state = {
    ordem: 'voteScore'
  }

  componentDidMount() {
    this.props.callCarregarPostagens()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.postagens.postagens['error'])
    this.props.history.push('/error-404')

    let ordem = nextProps.ordem.ordem
    this.setState({
      ordem: ordem
    })
  }

  handleExcluirPostagem = (id) => {
    let confirm = window.confirm('Deseja mesmo excluir este registro?')

    if(confirm === true) {
      this.props.callExcluirPostagem(id)
    }
  }

  handleSelecionarOrdem = (e) => {
    let ordem = e.target.value

    this.props.selecionarOrdem(ordem)
  }

  handleVotar = (id, option) => {
    let data = {
      option: option
    }

    this.props.callVotar(id, data, 'posts')
  }

  render() {
    let postagens = this.props.postagens.postagens

    postagens.sort(sortBy(`-${this.state.ordem}`))

    return (
      <section className="posts-table-wrapper">
        <div className="h3-wrapper">
          <h3>Todas as postagens</h3>
          <div className="input-group mb-3 col-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">Ordenar por</label>
            </div>
            <select className="form-control" onChange={this.handleSelecionarOrdem}>
              <option value="voteScore">Votos</option>
              <option value="timestamp">Data</option>
            </select>
          </div>
          <button className="btn btn-default"><Link to="/postagem/criar">Nova Postagem</Link></button>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoria</th>
              <th>Autor</th>
              <th>Data</th>
              <th>Comentários</th>
              <th>Votos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {postagens !== undefined && postagens.map((postagem) => {
              return (
                <tr key={postagem.id}>
                  <td>{postagem.title}</td>
                  <td>{postagem.category}</td>
                  <td>{postagem.author}</td>
                  <td>{Moment.unix(postagem.timestamp/1000).format('DD/MM/YYYY')}</td>
                  <td>{postagem.commentCount}</td>
                  <td>
                    <span style={{ 'marginRight':'5px' }}>{postagem.voteScore}</span>
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={() => this.handleVotar(postagem.id, 'upVote')}>
                      <span className="glyphicon glyphicon-thumbs-up"/>
                    </button>
                    <button className="btn btn-warning" onClick={() => this.handleVotar(postagem.id, 'downVote')}>
                      <span className="glyphicon glyphicon-thumbs-down"/>
                    </button>
                    <Link className='btn btn-default' to={`/${postagem.category}/${postagem.id}`}>
                      <span className="glyphicon glyphicon-zoom-in"/>
                    </Link>
                    <Link className='btn btn-primary' to={`/${postagem.category}/${postagem.id}/editar`}>
                      <span className="glyphicon glyphicon-pencil"/>
                    </Link>
                    <button className='btn btn-danger' onClick={() => this.handleExcluirPostagem(postagem.id)}>
                      <span className="glyphicon glyphicon-trash"/>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </section>
    )
  }
}

const mapStateToProps = ({ postagens, postagem, ordem }) => ({
  postagens,
  postagem,
  ordem
})

export default connect(mapStateToProps, { callCarregarPostagens, callCarregarPostagensPorCategoria, callExcluirPostagem, selecionarOrdem, callVotar })(PostsTable)