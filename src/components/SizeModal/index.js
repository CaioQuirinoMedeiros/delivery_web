import React, { Component } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { Container, SizeForm } from "./styles";

class SizeModal extends Component {
  state = {
    name: "",
    multiplier: "",
    image_id: "",
    category_id: "",
    isLoading: false,
    images: [],
    categories: []
  };

  componentDidMount() {
    const { size } = this.props;

    if (size) {
      const { name, multiplier, image_id, category_id } = size;

      this.setState({ name, multiplier, image_id, category_id });
    }

    this.loadImages();
    this.loadCategories();

    document.addEventListener("click", this.clickOutsideEventListener);
  }

  clickOutsideEventListener = e => {
    if (e.target.id === "outsideSizeModal") {
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
      toast.error("Erro ao buscar as imagens");
    }
  };

  loadCategories = async () => {
    try {
      const { data } = await api.get("admin/categories");

      this.setState({ categories: data });
    } catch (err) {
      console.log(err);
      toast.error("Erro ao buscar as categorias");
    }
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpdateSize = async () => {
    const { name, multiplier, image_id, category_id } = this.state;
    const { closeModal, size } = this.props;

    try {
      this.setState({ isLoading: true });

      await api.put(`admin/sizes/${size.id}`, {
        name,
        multiplier,
        image_id,
        category_id
      });

      closeModal();
      toast.success("Tamanho atualizado!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao editar o tamanho, confira os dados preenchidos");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleCreateSize = async e => {
    const { name, multiplier, image_id, category_id } = this.state;
    const { closeModal } = this.props;

    try {
      this.setState({ isLoading: true });

      await api.post("admin/sizes", {
        name,
        multiplier,
        image_id,
        category_id
      });

      closeModal();
      toast.success("Tamanho criado!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao criar o tamanho, confira os dados preenchidos");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { size } = this.props;

    size ? this.handleUpdateSize() : this.handleCreateSize();
  };

  render() {
    const {
      name,
      multiplier,
      image_id,
      category_id,
      isLoading,
      images,
      categories
    } = this.state;
    const { closeModal, size } = this.props;

    return (
      <Container id="outsideSizeModal">
        <SizeForm onSubmit={this.handleSubmit}>
          <h2>{size ? "Editar" : "Criar"} tamanho</h2>
          <input
            name="name"
            value={name}
            onChange={this.handleInputChange}
            placeholder="Nome"
          />
          <input
            name="multiplier"
            type="number"
            min="0"
            max="10"
            step="0.01"
            value={multiplier}
            onChange={this.handleInputChange}
            placeholder="Multipicador de preço"
          />
          <div>
            <label>Imagem</label>
            <select
              value={image_id}
              name="image_id"
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
          <div>
            <label>Categoria</label>
            <select
              value={category_id}
              name="category_id"
              onChange={this.handleInputChange}
            >
              {categories.length &&
                categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
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
        </SizeForm>
      </Container>
    );
  }
}

export default SizeModal;
