import React, { Component } from 'react';
import * as Api from '../utils/api'
import Post from './Post'

export default class App extends Component {
  state={
    categories:[]
  }

  componentDidMount(){
    this.getCategories()
  }

  getCategories = () => {
    Api.getCategories().then(categories => {
      this.setState({ categories })
      console.log(categories)
    })
  }

  render() {
    return (
      <div className="container">
        {
          this.state.categories.map((category, index) => {
            return(
              <div key={ index }>
                <legend>{ category.name } - posts</legend>
                <Post category={ category.path }/>
              </div>
            )
          })
        }
      </div>
    );
  }
}
