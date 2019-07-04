import React, { Component } from "react";
import { toast } from "react-toastify";

import api from "../../../services/api";

import NoImage from "../../../assets/images/no-image.jpg";

import SizeModal from "../../../components/SizeModal";

import {
  Container,
  SizeCard,
  SizeInfo,
  SizeImage,
  SizeDetails
} from "./styles";

import {
  EditDeleteOptions,
  EditButton,
  DeleteButton,
  AddButton
} from "../../../styles/buttons";

class Sizes extends Component {
  state = {
    sizes: [],
    modal: {
      open: false,
      size: null
    }
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
      toast.error("Erro ao buscar tamanhos");
    }
  };

  deleteSize = async id => {
    try {
      await api.delete(`admin/sizes/${id}`);

      this.loadSizes();
      toast.success("Tamanho deletado!");
    } catch (err) {
      console.log(err);
      toast.error("Não foi possível deletar o tamanho");
    }
  };

  closeModal = () => {
    this.setState({ modal: { open: false, size: null } });
    this.loadSizes();
  };

  openModal = (size = null) => {
    this.setState({ modal: { open: true, size } });
  };

  renderSize = size => (
    <SizeCard key={size.id}>
      <SizeInfo>
        <SizeImage imageUrl={size.image ? size.image.url : NoImage} />
        <SizeDetails>
          <strong>{size.name}</strong>
          <p>
            <span>Multiplicador de preço: </span>
            {size.multiplier}
          </p>
          <p>
            <span>Categoria: </span>
            {size.category.name}
          </p>
        </SizeDetails>
      </SizeInfo>
      <EditDeleteOptions>
        <EditButton onClick={() => this.openModal(size)} />
        <DeleteButton onClick={() => this.deleteSize(size.id)} />
      </EditDeleteOptions>
    </SizeCard>
  );

  render() {
    const { sizes, modal } = this.state;

    return (
      <Container>
        <AddButton onClick={() => this.openModal()} />
        {modal.open && (
          <SizeModal closeModal={this.closeModal} size={modal.size} />
        )}
        {sizes.map(size => this.renderSize(size))}
      </Container>
    );
  }
}

export default Sizes;
