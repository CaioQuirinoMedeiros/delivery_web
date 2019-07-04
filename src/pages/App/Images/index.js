import React, { Component } from "react";

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
    newImage: null
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
    }
  };

  handleImageChange = e => {
    const newImage = e.target.files[0];

    if (newImage) {
      newImage.url = URL.createObjectURL(newImage);
      this.setState({ newImage });
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
    } catch (err) {
      console.log(err);
    }
  };

  handleImageUpdate = async (id, original_name) => {
    try {
      await api.put(`admin/images/${id}`, { original_name });

      this.loadImages();
    } catch (err) {
      console.log(err);
    }
  };

  deleteImage = async (e, id) => {
    e.preventDefault();

    try {
      await api.delete(`admin/images/${id}`);

      this.loadImages();
    } catch (err) {
      console.log(err);
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

        <DeleteButton size={20} onClick={e => this.deleteImage(e, image.id)} />
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
