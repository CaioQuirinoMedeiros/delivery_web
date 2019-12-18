import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import api from "../../services/api";
import { Container, SizeForm } from "./styles";

function SizeModal({ size, closeModal }) {
  const [newSize, setNewSize] = useState({
    name: "",
    multiplier: "",
    image_id: "",
    category_id: ""
  });
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const clickOutside = useCallback(function clickOutsideEventListener(e) {
    if (e.target.id === "outsideCategoryModal") {
      closeModal();
    }
  }, [closeModal]);

  useState(() => {
    loadImages();
    loadCategories();
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [clickOutside]);

  useEffect(() => {
    if (size) {
      setNewSize({ ...size });
    }
  }, [size]);

  async function loadImages() {
    try {
      const { data } = await api.get("admin/images");

      setImages(data);
    } catch (err) {
      toast.error("Erro ao buscar as imagens");
    }
  }

  async function loadCategories() {
    try {
      const { data } = await api.get("admin/categories");

      setCategories(data);
    } catch (err) {
      toast.error("Erro ao buscar as categorias");
    }
  }

  function handleInputChange(e) {
    setNewSize({ ...newSize, [e.target.name]: e.target.value });
  }

  async function handleUpdateSize() {
    const { name, multiplier, image_id, category_id, id } = newSize;
    try {
      setLoading(true);

      await api.put(`admin/sizes/${id}`, {
        name,
        multiplier,
        image_id,
        category_id
      });

      closeModal();
      toast.success("Tamanho atualizado!");
    } catch (err) {
      toast.error("Erro ao editar o tamanho, confira os dados preenchidos");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateSize() {
    const { name, multiplier, image_id, category_id } = newSize;
    try {
      setLoading(true);

      await api.post("admin/sizes", {
        name,
        multiplier,
        image_id,
        category_id
      });

      closeModal();
      toast.success("Tamanho criado!");
    } catch (err) {
      toast.error("Erro ao criar o tamanho, confira os dados preenchidos");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (size) {
      handleUpdateSize();
    } else {
      handleCreateSize();
    }
  }

  return (
    <Container id="outsideSizeModal">
      <SizeForm onSubmit={handleSubmit}>
        <h2>{size ? "Editar" : "Criar"} tamanho</h2>
        <input
          name="name"
          value={newSize.name}
          onChange={handleInputChange}
          placeholder="Nome"
        />
        <input
          name="multiplier"
          type="number"
          min="0"
          max="10"
          step="0.01"
          value={newSize.multiplier}
          onChange={handleInputChange}
          placeholder="Multipicador de preço"
        />
        <div>
          <label>Imagem</label>
          <select
            value={newSize.image_id}
            name="image_id"
            onChange={handleInputChange}
          >
            {images.length &&
              images.map(image => (
                <option key={image.id} value={image.id}>
                  {image.original_name}
                </option>
              ))}
            <option value="" />
          </select>
        </div>
        <div>
          <label>Categoria</label>
          <select
            value={newSize.category_id}
            name="category_id"
            onChange={handleInputChange}
          >
            {categories.length &&
              categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            <option value="" />
          </select>
        </div>
        <button type="submit">{loading ? "Carregando..." : "Salvar"}</button>
        <button type="button" className="close" onClick={() => closeModal()}>
          Fechar
        </button>
      </SizeForm>
    </Container>
  );
}

SizeModal.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  multiplier: PropTypes.number,
  image_id: PropTypes.number,
  category_id: PropTypes.number
};

export default SizeModal;
