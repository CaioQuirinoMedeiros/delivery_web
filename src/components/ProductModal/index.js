import React, { Component } from "react";

import api from "../../services/api";
import { Container, ProductForm } from "./styles";

class ProductModal extends Component {
  state = {
    image_id: "",
    category_id: "",
    product_sizes: [],
    name: "",
    base_price: "",
    isLoading: false,
    error: "",
    images: [],
    categories: [],
    sizes: []
  };

  componentDidMount() {
    this.loadImages();
    this.loadCategories();
  }

  loadImages = async () => {
    try {
      const { data } = await api.get("admin/images");

      this.setState({ images: data });
    } catch (err) {
      console.log(err);
    }
  };

  loadCategories = async () => {
    try {
      const { data } = await api.get("admin/categories");

      this.setState({ categories: data });
    } catch (err) {
      console.log(err);
    }
  };

  loadSizes = async category => {
    if (!category) {
      this.setState({ sizes: [] });
      return;
    }

    try {
      const { data } = await api.get("admin/sizes", {
        params: { category }
      });

      this.setState({ sizes: data });
    } catch (err) {
      console.log(err);
    }
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  handleCategoryChange = e => {
    this.setState({ category_id: e.target.value, error: "" });

    this.loadSizes(e.target.value);
  };

  handleProductSizesChange = e => {
    const options = e.target.options;
    const product_sizes = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        product_sizes.push(options[i].value);
      }
    }

    this.setState({ product_sizes });
  };

  handleCreateProduct = async e => {
    e.preventDefault();

    const {
      name,
      base_price,
      image_id,
      category_id,
      product_sizes
    } = this.state;
    const { closeModal } = this.props;

    try {
      this.setState({ isLoading: true });

      await api.post("admin/products", {
        name,
        base_price,
        image_id,
        category_id,
        sizes: product_sizes.map(size => ({
          size_id: size
        }))
      });

      closeModal();
    } catch (err) {
      console.log(err);
      this.setState({ error: "Não foi possível criar o produto" });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const {
      name,
      base_price,
      isLoading,
      error,
      images,
      categories,
      sizes
    } = this.state;
    const { closeModal } = this.props;

    console.log(this.state.product_sizes);

    return (
      <Container>
        <ProductForm onSubmit={this.handleCreateProduct}>
          <h2>Criar novo produto</h2>
          {!!error && <span>{error}</span>}
          <input
            name="name"
            value={name}
            onChange={this.handleInputChange}
            placeholder="Nome"
          />
          <input
            name="base_price"
            type="number"
            min="0"
            max="1000"
            step="0.1"
            value={base_price}
            onChange={this.handleInputChange}
            placeholder="Preço base"
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
              <option value="" selected />
            </select>
          </div>
          <div>
            <label>Categoria</label>
            <select name="category_id" onChange={this.handleCategoryChange}>
              {categories.length &&
                categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              <option value="" selected />
            </select>
          </div>
          <div>
            <label>Tamanhos</label>
            <select
              multiple
              name="product_sizes"
              onChange={e => {
                this.handleProductSizesChange(e);
              }}
            >
              {sizes.length &&
                sizes.map(size => (
                  <option key={size.id} value={size.id}>
                    {size.name}
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
        </ProductForm>
      </Container>
    );
  }
}

export default ProductModal;
