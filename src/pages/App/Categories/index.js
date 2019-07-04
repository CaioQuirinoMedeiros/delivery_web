import React, { Component } from "react";
import { toast } from "react-toastify";

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
    modal: {
      open: false,
      category: {}
    },
    deleteToast: null
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
      toast.error("Erro ao buscar categorias");
    }
  };

  deleteToastNotification = id => {
    if (!toast.isActive(this.state.deleteToast)) {
      const deleteToast = toast.info("Clique aqui para confirmar a operação", {
        onClick: () => this.deleteCategory(id),
        autoClose: 5000
      });

      this.setState({ deleteToast });
    }
  };

  deleteCategory = async id => {
    try {
      await api.delete(`admin/categories/${id}`);

      this.loadCategories();
      toast.success("Categoria deletada!");
    } catch (err) {
      console.log(err);
      toast.error("Não foi possível deletar a categoria");
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
        <DeleteButton
          onClick={() => this.deleteToastNotification(category.id)}
        />
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
