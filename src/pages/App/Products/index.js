import React, { Component } from "react";

import api from "../../../services/api";
import { convertToBRL } from "../../../services/currency";

import NoImage from "../../../assets/images/no-image.jpg";
import ProductModal from "../../../components/ProductModal";

import {
  Container,
  ProductCard,
  ProductTop,
  ProductImage,
  ProductInfo,
  ProductDetails,
  ProductBottom
} from "./styles";

import {
  EditDeleteOptions,
  EditButton,
  DeleteButton,
  AddButton
} from "../../../styles/buttons";

class Products extends Component {
  state = {
    products: [],
    modal: {
      open: false,
      product: null
    }
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
          base_price_formatted: convertToBRL(Number(product.base_price))
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
    this.setState({ modal: { open: false, product: null } });
    this.loadProducts();
  };

  openModal = (product = null) => {
    this.setState({ modal: { open: true, product } });
  };

  renderProduct = product => (
    <ProductCard key={product.id}>
      <ProductTop>
        <ProductInfo>
          <ProductImage
            imageUrl={product.image ? product.image.url : NoImage}
          />
          <ProductDetails>
            <strong>{product.name}</strong>
            <p>
              <span>Categoria: </span>
              {product.category.name}
            </p>
            <p>
              <span>Preço base: </span>
              {product.base_price_formatted}
            </p>
          </ProductDetails>
        </ProductInfo>
        <EditDeleteOptions>
          <EditButton onClick={() => this.openModal(product)} />
          <DeleteButton onClick={() => this.deleteProduct(product.id)} />
        </EditDeleteOptions>
      </ProductTop>
      <ProductBottom>
        {product.sizes.map(product_size => (
          <p key={product_size.id}>
            <span>{product_size.size.name}: </span>
            {convertToBRL(Number(product_size.price))}
          </p>
        ))}
      </ProductBottom>
    </ProductCard>
  );

  render() {
    const { products, modal } = this.state;

    return (
      <Container>
        <AddButton onClick={() => this.openModal()} />
        {modal.open && (
          <ProductModal closeModal={this.closeModal} product={modal.product} />
        )}
        {products.map(product => this.renderProduct(product))}
      </Container>
    );
  }
}

export default Products;
