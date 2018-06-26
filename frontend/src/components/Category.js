import React, { Component } from 'react';

class Category extends Component {
  render () {
    return (
      <div>
        <p>{ this.props.category.name }</p>
      </div>
    )
  }
}

export default Category
