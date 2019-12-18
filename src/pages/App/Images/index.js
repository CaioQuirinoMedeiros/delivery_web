import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api from "../../../services/api";

import {
  Container,
  NewImageContainer,
  NewImageButtons,
  AddButton,
  ImagesWrapper,
  ImageCard,
  ImageContainer,
  DeleteButton
} from "./styles";

function ImagesContainer() {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [deleteToast, setDeleteToast] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      const { data } = await api.get("admin/images");

      setImages(data);
    } catch (err) {
      toast.error("Erro ao buscar imagens");
    }
  }

  function handleImageChange(e) {
    const image = e.target.files[0];

    if (image) {
      image.url = URL.createObjectURL(image);
      setNewImage(image);
      toast.info("Imagem pronta para ser adicionada!");
    } else {
      setNewImage(null);
    }

    e.target.value = "";
  }

  async function handleImageSubmit() {
    const data = new FormData();

    data.append("image", newImage);

    try {
      await api.post("admin/images", data);

      setNewImage(null);
      await loadImages();
      toast.success("Imagem adicionada!");
    } catch (err) {
      toast.error("Não foi possível adicionar a imagem");
    }
  }

  async function handleImageNameUpdate(id, original_name) {
    try {
      await api.put(`admin/images/${id}`, { original_name });

      loadImages();
      toast.success("Imagem editada!");
    } catch (err) {
      toast.error("Não foi possível editar a imagem");
    }
  }

  function deleteToastNotification(e, id) {
    e.preventDefault();

    if (!toast.isActive(deleteToast)) {
      const toastToDelete = toast.info("Clique aqui para confirmar a operação", {
        onClick: () => deleteImage(id),
        autoClose: 5000
      });

      setDeleteToast(toastToDelete);
    }
  }

  async function deleteImage(id) {
    try {
      await api.delete(`admin/images/${id}`);

      loadImages();
      toast.success("Imagem deletada!");
    } catch (err) {
      toast.error("Não foi possível deletar a imagem");
    }
  }

  function renderImage(image) {
    return (
      <ImageCard key={image.id}>
        <ImageContainer imageUrl={image.url} href={image.url} target="_blank" />

        <input
          defaultValue={image.original_name}
          onBlur={e => handleImageNameUpdate(image.id, e.target.value)}
        />

        <DeleteButton
          size={20}
          onClick={e => deleteToastNotification(e, image.id)}
        />
      </ImageCard>
    );
  }

  return (
    <Container>
      <ImagesWrapper>
        <NewImageContainer>
          <input id="fileInput" type="file" onChange={handleImageChange} />
          {newImage && <ImageContainer imageUrl={newImage.url} />}
          <NewImageButtons>
            <label htmlFor="fileInput">Carregar imagem</label>
            {newImage && <AddButton onClick={handleImageSubmit} />}
          </NewImageButtons>
        </NewImageContainer>
        {images.map(image => renderImage(image))}
      </ImagesWrapper>
    </Container>
  );
}

export default ImagesContainer;
