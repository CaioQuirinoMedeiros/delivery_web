import React, { Component } from "react";

import api from "../../../services/api";

import CategoryModal from "../../../components/CategoryModal";

import { Container, CategoryCard } from "./styles";

class Categories extends Component {
  state = {
    categories: [],
    isModalOpen: false
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

  deleteCategory = async id => {
    try {
      await api.delete(`admin/categories/${id}`);

      this.loadCategories();
    } catch (err) {
      console.log(err);
    }
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
    this.loadCategories();
  };

  renderCategory = category => (
    <CategoryCard key={category.id}>
      <button type="button" onClick={() => this.deleteCategory(category.id)}>
        X
      </button>
      <img src={category.image.url} alt={category.name} />
      <div className="categoryInfo">
        <div>
          <strong>{category.name}</strong>
          <p>{category.description}</p>
        </div>
        <p>{category.cook_time} mins</p>
      </div>
    </CategoryCard>
  );

  render() {
    const { categories, isModalOpen } = this.state;

    return (
      <Container>
        {isModalOpen && <CategoryModal closeModal={this.closeModal} />}
        {categories.map(category => this.renderCategory(category))}
        <button
          type="button"
          onClick={() => this.setState({ isModalOpen: true })}
        >
          Novo
        </button>
      </Container>
    );
  }
}

export default Categories;
