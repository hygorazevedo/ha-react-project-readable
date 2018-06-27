import React, { Component } from 'react';
import { connect } from 'react-redux'
import Category from './Category'

import {
  loadCategoriesFromApi
 } from '../actions'

class App extends Component {
  componentDidMount() {
    this.props.loadCategoriesFromApi()
  }

  render() {
    return (
      <div className="container">
      {
        this.props.categories.map((category, index) => {
          if (category.name !== '') {
            return <Category key={ index } category={ category } />
          }
          else {
            return <div key={ index }></div>
          }
        })
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      categories: state.categoryReducer.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
      loadCategoriesFromApi: () => { dispatch(loadCategoriesFromApi()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
