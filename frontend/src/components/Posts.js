import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'moment'
import sortBy from 'sort-by'

import { selecionarOrdem } from '../actions/actionCreators'
import {
  callCarregarPostagens,
  callCarregarPostagensPorCategoria,
  callExcluirPostagem,
  callVotar
} from '../actions/index'

class Posts extends Component {
  state = {
    ordem: 'voteScore'
  }

  componentDidMount() {
    let categoria = this.props.match.params.category
    if (categoria === undefined) {
      this.props.callCarregarPostagens()
    } else {
      this.props.callCarregarPostagensPorCategoria(categoria)
    }
  }

  componentWillReceiveProps(nextProps) {
    let ordem = nextProps.ordem.ordem

    this.setState({
      ordem: ordem
    })
  }

  handleExcluirPostagem = (id) => {
    let confirm = window.confirm('Deseja mesmo excluir este registro?')

    if (confirm === true) {
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
          <div className="ordenar-por">
            <label>Ordenar por:</label>
            <select onChange={this.handleSelecionarOrdem}>
              <option value="voteScore">Votos</option>
              <option value="timestamp">Data</option>
            </select>
          </div>
          <button><Link to="/postagens/criar">Nova Postagem</Link></button>
        </div>
        <table className="posts-table">
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
            {postagens !== undefined && postagens.map((postagem, index) => (
              <tr key={index}>
                <td>{postagem.title}</td>
                <td>{postagem.category}</td>
                <td>{postagem.author}</td>
                <td>{Moment.unix(postagem.timestamp / 1000).format('DD/MM/YYYY')}</td>
                <td>{postagem.commentCount}</td>
                <td>
                  <span style={{ 'marginRight': '5px',  }}>{postagem.voteScore}</span>
                </td>
                <td>
                  <button style={{ 'marginRight': '5px' }}><Link to={`/${postagem.category}/${postagem.id}`}>Ver</Link></button>
                  <button style={{ 'marginRight': '5px' }}><Link to={`/postagens/${postagem.id}/editar`}>Editar</Link></button>
                  <button onClick={() => this.handleExcluirPostagem(postagem.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }
}

const mapStateToProps = ({ postagens, postagem, ordem }) => ({
  postagens,
  postagem,
  ordem
})

export default connect(mapStateToProps, { callCarregarPostagens, callCarregarPostagensPorCategoria, callExcluirPostagem, selecionarOrdem, callVotar })(Posts)