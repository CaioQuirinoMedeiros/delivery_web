import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import api from "../../services/api";
import { Container, CategoryForm } from "./styles";

function CategoryModal({ category, closeModal }) {
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    cook_time: "",
    image_id: ""
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadImages();
    document.addEventListener("click", clickOutsideEventListener);

    return () => {
      document.removeEventListener("click", clickOutsideEventListener);
    };
  }, []);

  useEffect(() => {
    if (category) {
      setNewCategory({ ...category });
    }
  }, [category]);

  function clickOutsideEventListener(e) {
    console.log("clicou", e.target);
    if (e.target.id === "outsideCategoryModal") {
      closeModal();
    }
  }

  async function loadImages() {
    try {
      const { data } = await api.get("admin/images");

      setImages(data);
    } catch (err) {
      toast.warn("Erro ao buscar as imagens");
    }
  }

  function handleInputChange(e) {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  }

  async function handleUpdateCategory() {
    const { id, name, description, cook_time, image_id } = newCategory;

    try {
      setLoading(true);

      await api.put(`admin/categories/${id}`, {
        name,
        description,
        cook_time,
        image_id
      });

      closeModal();
      toast.success("Categoria atualizada!");
    } catch (err) {
      toast.error("Erro ao editar a categoria, confira os dados preenchidos");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCategory() {
    const { name, description, cook_time, image_id } = newCategory;

    try {
      setLoading(true);

      await api.post("admin/categories", {
        name,
        description,
        cook_time,
        image_id
      });

      closeModal();
      toast.success("Categoria criada!");
    } catch (err) {
      toast.error("Erro ao criar a categoria, confira os dados preenchidos");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (category) {
      handleUpdateCategory();
    } else {
      handleCreateCategory();
    }
  }

  return (
    <Container id="outsideCategoryModal">
      <CategoryForm onSubmit={handleSubmit}>
        <h2>{category ? "Editar" : "Criar"} categoria</h2>
        <input
          name="name"
          value={newCategory.name}
          onChange={handleInputChange}
          placeholder="Nome"
        />
        <input
          name="description"
          value={newCategory.description}
          onChange={handleInputChange}
          placeholder="Descrição"
        />
        <input
          name="cook_time"
          type="number"
          min="0"
          max="300"
          step="1"
          value={newCategory.cook_time}
          onChange={handleInputChange}
          placeholder="Tempo de preparo"
        />
        <div>
          <label>Imagem</label>
          <select
            name="image_id"
            value={newCategory.image_id}
            onChange={handleInputChange}
          >
            {images.length &&
              images.map(image => (
                <option key={image.id} value={image.id}>
                  {image.original_name}
                </option>
              ))}
            <option selected value="" />
          </select>
        </div>
        <button type="submit">{loading ? "Carregando..." : "Salvar"}</button>
        <button type="button" className="close" onClick={() => closeModal()}>
          Fechar
        </button>
      </CategoryForm>
    </Container>
  );
}

CategoryModal.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    cook_time: PropTypes.number,
    image_id: PropTypes.number
  })
};

export default CategoryModal;
