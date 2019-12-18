import React, { useState, useEffect } from "react";
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

function Sizes () {
  const [sizes, setSizes] = useState([])
  const [editSize, setEditSize] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteToast, setDeleteToast] = useState(null)

  useEffect(() => {
    loadSizes()
  }, [])

  useEffect(() => {
    if (editSize) {
      setModalOpen(true)
    }
  }, [editSize])

  useEffect(() => {
    if (!modalOpen) {
      setEditSize(null)
      loadSizes()
    }
  }, [modalOpen])

  async function loadSizes () {
    try {
      const { data } = await api.get("admin/sizes");

      setSizes(data)
    } catch (err) {
      toast.error("Erro ao buscar tamanhos");
    }
  };

  function deleteToastNotification (id) {
    if (!toast.isActive(deleteToast)) {
      const toastToDelete = toast.info("Clique aqui para confirmar a operação", {
        onClick: () => deleteSize(id),
        autoClose: 5000
      });

      setDeleteToast(toastToDelete)
    }
  };

  async function deleteSize (id) {
    try {
      await api.delete(`admin/sizes/${id}`);

      loadSizes();
      toast.success("Tamanho deletado!");
    } catch (err) {
      toast.error("Não foi possível deletar o tamanho");
    }
  };

  function renderSize (size) {
    return (
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
        <EditButton onClick={() => setEditSize(size)} />
        <DeleteButton onClick={() => deleteToastNotification(size.id)} />
      </EditDeleteOptions>
    </SizeCard>
  );
    }

    return (
      <Container>
        <AddButton onClick={() => setModalOpen(true)} />
        {modalOpen && (
          <SizeModal closeModal={() => setModalOpen(false)} size={editSize} />
        )}
        {sizes.map(size => renderSize(size))}
      </Container>
    );
}

export default Sizes;
