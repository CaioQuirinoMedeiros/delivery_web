import React, { Component } from "react";

import api from "../../../services/api";

import NoImage from "../../../assets/images/no-image.jpg";
import CategoryModal from "../../../components/CategoryModal";

import {
  Container,
  CategoryCard,
  CategoryInfo,
  CategoryImage,
  CategoryDetails
} from "./styles";

import {
  EditDeleteOptions,
  EditButton,
  DeleteButton,
  AddButton
} from "../../../styles/buttons";

class Categories extends Component {
  state = {
    categories: [],
    isModalOpen: false,
    modal: {
      open: false,
      category: {}
    }
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
    this.setState({ modal: { open: false, category: null } });
    this.loadCategories();
  };

  openModal = (category = null) => {
    this.setState({ modal: { open: true, category } });
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
            <span>Tempo de preparo: </span>
            {category.cook_time} mins
          </p>
        </CategoryDetails>
      </CategoryInfo>
      <EditDeleteOptions>
        <EditButton onClick={() => this.openModal(category)} />
        <DeleteButton onClick={() => this.deleteCategory(category.id)} />
      </EditDeleteOptions>
    </CategoryCard>
  );

  render() {
    const { categories, modal } = this.state;

    return (
      <Container>
        {modal.open && (
          <CategoryModal
            closeModal={this.closeModal}
            category={modal.category}
          />
        )}
        <AddButton onClick={() => this.openModal()} />
        {categories.map(category => this.renderCategory(category))}
      </Container>
    );
  }
}

export default Categories;
