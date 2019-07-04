import React, { Component } from "react";
import { toast } from "react-toastify";

import api from "../../../services/api";

import {
  Container,
  NewImageContainer,
  NewImageButtons,
  AddButton,
  ImagesContainer,
  ImageCard,
  ImageContainer,
  ImageNameAndDelete
} from "./styles";

import { DeleteButton } from "../../../styles/buttons";

class Images extends Component {
  state = {
    images: [],
    newImage: null,
    deleteToast: null
  };

  componentDidMount() {
    this.loadImages();
  }

  loadImages = async () => {
    try {
      const response = await api.get("admin/images");

      this.setState({ images: response.data });
    } catch (err) {
      console.log(err);
      toast.error("Erro ao buscar imagens");
    }
  };

  handleImageChange = e => {
    const newImage = e.target.files[0];

    if (newImage) {
      newImage.url = URL.createObjectURL(newImage);
      this.setState({ newImage });
      toast.info("Imagem pronta para ser adicionada!");
    } else {
      this.setState({ newImage: null });
    }

    e.target.value = "";
  };

  handleImageSubmit = async () => {
    const data = new FormData();

    data.append("image", this.state.newImage);

    try {
      await api.post("admin/images", data);

      this.setState({ newImage: null });
      await this.loadImages();
      toast.success("Imagem adicionada!");
    } catch (err) {
      console.log(err);
      toast.error("Não foi possível adicionar a imagem");
    }
  };

  handleImageUpdate = async (id, original_name) => {
    try {
      await api.put(`admin/images/${id}`, { original_name });

      this.loadImages();
      toast.success("Imagem editada!");
    } catch (err) {
      console.log(err);
      toast.error("Não foi possível editar a imagem");
    }
  };

  deleteToastNotification = (e, id) => {
    e.preventDefault();

    if (!toast.isActive(this.state.deleteToast)) {
      const deleteToast = toast.info("Clique aqui para confirmar a operação", {
        onClick: () => this.deleteImage(id),
        autoClose: 5000
      });

      this.setState({ deleteToast });
    }
  };

  deleteImage = async id => {
    try {
      await api.delete(`admin/images/${id}`);

      this.loadImages();
      toast.success("Imagem deletada!");
    } catch (err) {
      console.log(err);
      toast.error("Não foi possível deletar a imagem");
    }
  };

  renderImage = image => (
    <ImageCard key={image.id} href={image.url} target="_blank">
      <ImageContainer imageUrl={image.url} />
      <ImageNameAndDelete>
        <input
          defaultValue={image.original_name}
          onClick={e => e.preventDefault()}
          onBlur={e => this.handleImageUpdate(image.id, e.target.value)}
        />

        <DeleteButton
          size={20}
          onClick={e => this.deleteToastNotification(e, image.id)}
        />
      </ImageNameAndDelete>
    </ImageCard>
  );

  render() {
    const { images, newImage } = this.state;

    return (
      <Container>
        <ImagesContainer>
          <NewImageContainer>
            <input
              id="fileInput"
              type="file"
              onChange={this.handleImageChange}
            />
            {newImage && <ImageContainer imageUrl={newImage.url} />}
            <NewImageButtons>
              <label htmlFor="fileInput">Carregar imagem</label>
              {newImage && <AddButton onClick={this.handleImageSubmit} />}
            </NewImageButtons>
          </NewImageContainer>
          {images.map(image => this.renderImage(image))}
        </ImagesContainer>
      </Container>
    );
  }
}

export default Images;
