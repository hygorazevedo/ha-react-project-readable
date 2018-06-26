import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadCategoriesFromApi } from '../actions'
import Category from './Category'
import PropTypes from 'prop-types'

class App extends Component {
  static propTypes = {
    categories: PropTypes.array,
    loadCategoriesFromApi: PropTypes.func
  }

  componentDidMount () {
    this.props.loadCategoriesFromApi()
  }

  createCategoriesList() {
    return this.props.categories.map((category, index) => {
      return (
        <Category key={ index } category={ category } />
      )
    })
  }

  render() {
    return (
      <div className="container">

      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state.categories)
  return {
      categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
      loadCategoriesFromApi: () => {
        dispatch(loadCategoriesFromApi())
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
