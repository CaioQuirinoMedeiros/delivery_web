import React, { Component } from "react";

import api from "../../../services/api";
import { convertToBRL } from "../../../services/currency";

import ProductModal from "../../../components/ProductModal";

import { Container, ProductCard } from "./styles";

class Products extends Component {
  state = {
    products: [],
    isModalOpen: false
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    try {
      const { data } = await api.get("admin/products");

      this.setState({
        products: data.map(product => ({
          ...product,
          base_price: convertToBRL(Number(product.base_price))
        }))
      });
    } catch (err) {
      console.log(err);
    }
  };

  deleteProduct = async id => {
    try {
      await api.delete(`admin/products/${id}`);

      this.loadProducts();
    } catch (err) {
      console.log(err);
    }
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
    this.loadProducts();
  };

  renderProduct = product => (
    <ProductCard key={product.id}>
      <button type="button" onClick={() => this.deleteProduct(product.id)}>
        X
      </button>
      <img src={product.image.url} alt={product.name} />
      <div className="productInfo">
        <strong>{product.name}</strong>
        <p>Categoria: {product.category.name}</p>
        <p>Preço base: {product.base_price}</p>
        <ul>
          {product.sizes.map(product_size => (
            <li key={product_size.id}>
              <span>{product_size.size.name}:</span>
              <span>{convertToBRL(Number(product_size.price))}</span>
            </li>
          ))}
        </ul>
      </div>
    </ProductCard>
  );

  render() {
    const { products, isModalOpen } = this.state;
    console.log(products);

    return (
      <Container>
        {isModalOpen && <ProductModal closeModal={this.closeModal} />}
        {products.map(product => this.renderProduct(product))}
        <button
          type="button"
          onClick={() => this.setState({ isModalOpen: true })}
        >
          Novo
        </button>
      </Container>
    );
  }
}

export default Products;
