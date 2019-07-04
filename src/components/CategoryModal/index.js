import React, { Component } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { Container, CategoryForm } from "./styles";

class CategoryModal extends Component {
  state = {
    name: "",
    description: "",
    cook_time: "",
    image_id: "",
    isLoading: false,
    images: []
  };

  componentDidMount() {
    const { category } = this.props;

    if (category) {
      const { name, description, cook_time, image_id } = category;
      this.setState({ name, description, cook_time, image_id });
    }

    this.loadImages();

    document.addEventListener("click", this.clickOutsideEventListener);
  }

  clickOutsideEventListener = e => {
    if (e.target.id === "outsideCategoryModal") {
      this.props.closeModal();
    }
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.clickOutsideEventListener);
  }

  loadImages = async () => {
    try {
      const { data } = await api.get("admin/images");

      this.setState({ images: data });
    } catch (err) {
      console.log(err);
      toast.warn("Erro ao buscar as imagens");
    }
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpdateCategory = async e => {
    const { category, closeModal } = this.props;
    const { name, description, cook_time, image_id } = this.state;

    try {
      this.setState({ isLoading: true });

      await api.put(`admin/categories/${category.id}`, {
        name,
        description,
        cook_time,
        image_id
      });

      closeModal();
      toast.success("Categoria atualizada!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao editar a categoria, confira os dados preenchidos");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleCreateCategory = async e => {
    const { name, description, cook_time, image_id } = this.state;
    const { closeModal } = this.props;

    try {
      this.setState({ isLoading: true });

      await api.post("admin/categories", {
        name,
        description,
        cook_time,
        image_id
      });

      closeModal();
      toast.success("Categoria criada!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao criar a categoria, confira os dados preenchidos");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { category } = this.props;

    category ? this.handleUpdateCategory() : this.handleCreateCategory();
  };

  render() {
    const {
      name,
      description,
      cook_time,
      image_id,
      isLoading,
      images
    } = this.state;
    const { closeModal, category } = this.props;

    return (
      <Container id="outsideCategoryModal">
        <CategoryForm onSubmit={this.handleSubmit}>
          <h2>{category ? "Editar" : "Criar"} categoria</h2>
          <input
            name="name"
            value={name}
            onChange={this.handleInputChange}
            placeholder="Nome"
          />
          <input
            name="description"
            value={description}
            onChange={this.handleInputChange}
            placeholder="Descrição"
          />
          <input
            name="cook_time"
            type="number"
            min="0"
            max="600"
            step="1"
            value={cook_time}
            onChange={this.handleInputChange}
            placeholder="Tempo de preparo"
          />
          <div>
            <label>Imagem</label>
            <select
              name="image_id"
              value={image_id}
              onChange={this.handleInputChange}
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
          <button type="submit">
            {isLoading ? "Carregando..." : "Salvar"}
          </button>
          <button type="button" className="close" onClick={() => closeModal()}>
            Fechar
          </button>
        </CategoryForm>
      </Container>
    );
  }
}

export default CategoryModal;
