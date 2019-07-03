import React, { Component } from "react";

import api from "../../../services/api";

import NoImage from "../../../assets/images/no-image.jpg";
import CategoryModal from "../../../components/CategoryModal";

import {
  Container,
  CategoryCard,
  CategoryInfo,
  DeleteCategoryButton,
  AddCategoryButton
} from "./styles";

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
      <CategoryInfo>
        <img
          src={category.image ? category.image.url : NoImage}
          alt={category.name}
        />
        <div>
          <strong>{category.name}</strong>
          <p>
            <span>Descrição: </span>
            {category.description}
          </p>
          <p>
            <span>Tempo de cozimento: </span>
            {category.cook_time} mins
          </p>
        </div>
      </CategoryInfo>
      <DeleteCategoryButton onClick={() => this.deleteCategory(category.id)} />
    </CategoryCard>
  );

  render() {
    const { categories, isModalOpen } = this.state;

    return (
      <Container>
        {isModalOpen && <CategoryModal closeModal={this.closeModal} />}
        {categories.map(category => this.renderCategory(category))}
        {/* <button
          type="button"
          onClick={() => this.setState({ isModalOpen: true })}
        >
          Novo
        </button> */}
        <AddCategoryButton
          onClick={() => this.setState({ isModalOpen: true })}
        />
      </Container>
    );
  }
}

export default Categories;
