import React, { Component } from "react";

import api from "../../../services/api";

import SizeModal from "../../../components/SizeModal";

import { Container, SizeCard } from "./styles";

class Sizes extends Component {
  state = {
    sizes: [],
    isModalOpen: false
  };

  componentDidMount() {
    this.loadSizes();
  }

  loadSizes = async () => {
    try {
      const { data } = await api.get("admin/sizes");

      this.setState({ sizes: data });
    } catch (err) {
      console.log(err);
    }
  };

  deleteSize = async id => {
    try {
      await api.delete(`admin/sizes/${id}`);

      this.loadSizes();
    } catch (err) {
      console.log(err);
    }
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
    this.loadSizes();
  };

  renderSize = size => (
    <SizeCard key={size.id}>
      <button type="button" onClick={() => this.deleteSize(size.id)}>
        X
      </button>
      <img src={size.image.url} alt={size.name} />
      <div className="sizeInfo">
        <div>
          <strong>{size.name}</strong>
          <p>Multiplicador de preço: {size.multiplier}</p>
        </div>
        <p>Categoria: {size.category.name}</p>
      </div>
    </SizeCard>
  );

  render() {
    const { sizes, isModalOpen } = this.state;

    return (
      <Container>
        {isModalOpen && <SizeModal closeModal={this.closeModal} />}
        {sizes.map(size => this.renderSize(size))}
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

export default Sizes;
