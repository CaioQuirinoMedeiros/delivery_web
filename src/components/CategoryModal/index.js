import React, { Component } from "react";

import api from "../../services/api";
import { Container, CategoryForm } from "./styles";

class CategoryModal extends Component {
  state = {
    image_id: "",
    name: "",
    description: "",
    cook_time: "",
    isLoading: false,
    error: "",
    images: []
  };

  componentDidMount() {
    this.loadImages();
  }

  loadImages = async () => {
    try {
      const { data } = await api.get("admin/images");

      this.setState({ images: data });
    } catch (err) {
      console.log(err);
    }
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  handleCreateCategory = async e => {
    e.preventDefault();

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
    } catch (err) {
      console.log(err);
      this.setState({ error: "Não foi possível criar a categoria" });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const {
      name,
      description,
      cook_time,
      isLoading,
      error,
      images
    } = this.state;
    const { closeModal } = this.props;

    return (
      <Container>
        <CategoryForm onSubmit={this.handleCreateCategory}>
          <h2>Criar nova categoria</h2>
          {!!error && <span>{error}</span>}
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
            value={cook_time}
            onChange={this.handleInputChange}
            placeholder="Tempo de cozimento"
          />
          <div>
            <label>Imagem</label>
            <select
              name="image_id"
              onChange={e => this.setState({ image_id: e.target.value })}
            >
              {images.length &&
                images.map(image => (
                  <option key={image.id} value={image.id}>
                    {image.original_name}
                  </option>
                ))}
            </select>
          </div>
          <button type="submit">
            {isLoading ? "Carregando..." : "Enviar"}
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