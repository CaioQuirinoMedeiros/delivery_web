import React, { useState, useEffect } from "react";
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

function Categories() {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteToast, setDeleteToast] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (editCategory) {
      setModalOpen(true)
    }
  }, [editCategory]);

  useEffect(() => {
    if (!modalOpen) {
      setEditCategory(null)
      loadCategories()
    }
  }, [modalOpen]);

  async function loadCategories() {
    try {
      const { data } = await api.get("admin/categories");

      setCategories(data);
    } catch (err) {
      console.log(err);
      toast.error("Erro ao buscar categorias");
    }
  }

  function deleteToastNotification(id) {
    if (!toast.isActive(deleteToast)) {
      const toastToDelete = toast.info(
        "Clique aqui para confirmar a operação",
        {
          onClick: () => deleteCategory(id),
          autoClose: 5000
        }
      );

      setDeleteToast(toastToDelete);
    }
  }

  async function deleteCategory(id) {
    try {
      await api.delete(`admin/categories/${id}`);

      loadCategories();
      toast.success("Categoria deletada!");
    } catch (err) {
      console.log(err);
      toast.error("Não foi possível deletar a categoria");
    }
  }

  function renderCategory(category) {
    return (
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
          <EditButton onClick={() => setEditCategory(category)} />
          <DeleteButton onClick={() => deleteToastNotification(category.id)} />
        </EditDeleteOptions>
      </CategoryCard>
    );
  }

  return (
    <Container>
      {!!modalOpen && (
        <CategoryModal closeModal={() => setModalOpen(false)} category={editCategory} />
      )}
      <AddButton onClick={() => setModalOpen(true)} />
      {categories.map(category => renderCategory(category))}
    </Container>
  );
}

export default Categories;
