import React, { Component } from 'react';
import * as Api from '../utils/api'

export default class Post extends Component {
  state={
    posts:[]
  }

  componentDidMount(){
    this.getCategoryPosts(this.props.category)
  }

  getCategoryPosts = (category) => {
    Api.getCategoryPosts(category).then(posts => {
      this.setState({ posts })
    })
  }
  render () {
    return (
      this.state.posts.map((post, index) => {
        return(
          <div key={ index } className="container">
            <p>{ post.title }</p>
            <p>{ post.body }</p>
            <p>{ post.author }</p>
          </div>
        )
      })
    )
  }
}
