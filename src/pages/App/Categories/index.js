import React, { Component } from "react";

import api from "../../../services/api";
// import { Container } from './styles';

class Categories extends Component {
  state = {
    categories: []
  };

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = async () => {
    try {
      const { data } = await api.get("admin/categories");

      this.setState({ categories: data });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
        {categories.map(category => (
          <h2 key={category.id}>{category.name}a</h2>
        ))}
      </div>
    );
  }
}

export default Categories;
