import React, { Component } from "react";

import api from "../../../services/api";

import NoImage from "../../../assets/images/no-image.jpg";
import CategoryModal from "../../../components/CategoryModal";

import {
  Container,
  CategoryCard,
  CategoryInfo,
  CategoryImage,
  CategoryDetails,
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

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
    this.loadCategories();
  };

  renderCategory = category => (
    <CategoryCard key={category.id}>
      <CategoryInfo>
        <CategoryImage
          imageUrl={category.image ? category.image.url : NoImage}
        />
        <CategoryDetails>
          <strong>{category.name}</strong>
          <p>
            <span>Descrição: </span>
            {category.description}
          </p>
          <p>
            <span>Tempo de cozimento: </span>
            {category.cook_time} mins
          </p>
        </CategoryDetails>
      </CategoryInfo>
      <DeleteCategoryButton onClick={() => this.deleteCategory(category.id)} />
    </CategoryCard>
  );

  render() {
    const { categories, isModalOpen } = this.state;

    return (
      <Container>
        {isModalOpen && <CategoryModal closeModal={this.closeModal} />}
        <AddCategoryButton onClick={this.openModal} />
        {categories.map(category => this.renderCategory(category))}
      </Container>
    );
  }
}

export default Categories;
