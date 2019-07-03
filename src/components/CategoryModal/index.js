import React, { Component } from "react";

import api from "../../services/api";
import { Container, CategoryForm } from "./styles";

class CategoryModal extends Component {
  state = {
    name: "",
    description: "",
    cook_time: "",
    image_id: "",
    isLoading: false,
    error: "",
    images: []
  };

  componentDidMount() {
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
      <Container id="outsideCategoryModal">
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
            type="number"
            min="0"
            max="600"
            step="1"
            value={cook_time}
            onChange={this.handleInputChange}
            placeholder="Tempo de cozimento"
          />
          <div>
            <label>Imagem</label>
            <select name="image_id" onChange={this.handleInputChange}>
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
