import React, { Component } from 'react';

import { capitalize } from '../utils/helper'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCategory } from '../actions/actionCreators'
import { loadComentariesFromAPI } from '../actions/index'

class Categories extends Component {
    componentDidMount() {
        this.props.loadComentariesFromAPI()
    }

    handleSelecionarCategoria = (e) => {
        e.preventDefault()

        let category = e.target.attributes.getNamedItem('category').value

        this.props.selectCategory(category)

        window.location = '/' + category
    }
    render() {
        let categories = this.props.categories.categories

        return (
        <section>
            <h3>categories</h3>
            <ul>
            <li><Link to="/">Todas</Link></li>
            {categories !== undefined && categories.map((category) => (
                <li key={category.name}><Link to="#" onClick={this.handleSelecionarCategoria} category={category.name}>{capitalize(category.name)}</Link></li>
            ))}
            </ul>
        </section>
        )
    }
}

const mapStateToProps = ({ category, categories }) => ({
    category,
    categories
})

export default connect(mapStateToProps, { loadComentariesFromAPI, selectCategory })(Categories)