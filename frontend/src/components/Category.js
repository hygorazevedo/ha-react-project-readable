import React, { Component } from 'react';
import { connect } from 'react-redux'

class Category extends Component {
  render () {
    return (
      <div>
        <p>{ this.props.category.name }</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      posts: state.postReducer.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
      //loadPostsFromApi: (e) => { dispatch(loadPostsFromApi(e)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
