import React, { Component } from "react";

import api from "../../../services/api";
import {
  Container,
  NewImageContainer,
  ImagesContainer,
  ImageCard
} from "./styles";

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
    newImage.url = URL.createObjectURL(newImage);
    this.setState({ newImage });
  };

  handleImageSubmit = async () => {
    const data = new FormData();

    data.append("image", this.state.newImage);

    try {
      await api.post("admin/images", data);

      this.setState({ newImage: null });
      await this.loadImages();
    } catch (err) {
      console.log("erro: ", err);
    }
  };

  renderImage = image => (
    <ImageCard key={image.id} href={image.url} target="_blank">
      <img src={image.url} alt={image.original_name} />
      <strong>{image.original_name}</strong>
    </ImageCard>
  );

  render() {
    const { images, newImage } = this.state;

    return (
      <Container>
        <NewImageContainer>
          <div>
            <input type="file" onChange={this.handleImageChange} />
            {newImage && <img src={newImage.url} alt="nova imagem" />}
          </div>
          <button type="button" onClick={this.handleImageSubmit}>
            Salvar
          </button>
        </NewImageContainer>
        <ImagesContainer>
          {images.map(image => this.renderImage(image))}
        </ImagesContainer>
      </Container>
    );
  }
}

export default Images;
