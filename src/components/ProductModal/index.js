import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import api from "../../services/api";
import { Container, ProductForm } from "./styles";

function ProductModal({ product, closeModal }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    base_price: "",
    image_id: "",
    category_id: "",
    product_sizes: []
  });
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const clickOutside = useCallback(
    function clickOutsideEventListener(e) {
      if (e.target.id === "outsideCategoryModal") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    loadImages();
    loadCategories();
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [clickOutside]);

  useEffect(() => {
    if (product) {
      setNewProduct({
        ...product,
        product_sizes: product.sizes.map(size => size.size_id)
      });
    }
  }, [product]);

  useEffect(() => {
    loadSizes();
  }, [newProduct.category_id]);

  async function loadImages() {
    try {
      const { data } = await api.get("admin/images");

      setImages(data);
    } catch (err) {
      toast.error("Erro ao buscar as imagens");
    }
  }

  async function loadCategories() {
    try {
      const { data } = await api.get("admin/categories");

      setCategories(data);
    } catch (err) {
      toast.error("Erro ao buscar as categorias");
    }
  }

  async function loadSizes() {
    if (!newProduct.category_id) {
      setSizes([]);
      return;
    }

    try {
      const { data } = await api.get("admin/sizes", {
        params: { category: newProduct.category_id }
      });

      setSizes(data);
    } catch (err) {
      toast.error("Erro ao buscar os tamanhos");
    }
  }

  function handleInputChange(e) {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  }

  function handleProductSizesChange(e) {
    const options = Object.values(e.target.options);
    const selectedOptions = options.filter(option => option.selected);

    setNewProduct({
      ...newProduct,
      product_sizes: selectedOptions.map(option => option.value)
    });
  }

  async function handleUpdateProduct() {
    const {
      name,
      base_price,
      image_id,
      category_id,
      product_sizes,
      id
    } = newProduct;
    try {
      setLoading(true);

      await api.put(`admin/products/${id}`, {
        name,
        base_price,
        image_id,
        category_id,
        sizes: product_sizes.map(size => ({
          size_id: size
        }))
      });

      closeModal();
      toast.success("Produto atualizado!");
    } catch (err) {
      toast.error("Erro ao editar o produto, confira os dados preenchidos");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateProduct() {
    const {
      name,
      base_price,
      image_id,
      category_id,
      product_sizes
    } = newProduct;

    try {
      setLoading(true);

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
      toast.success("Produto criado!");
    } catch (err) {
      toast.error("Erro ao criar o produto, confira os dados preenchidos");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (product) {
      handleUpdateProduct();
    } else {
      handleCreateProduct();
    }
  }

  return (
    <Container id="outsideProductModal">
      <ProductForm onSubmit={handleSubmit}>
        <h2>{product ? "Editar" : "Criar"} produto</h2>
        <input
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Nome"
        />
        <input
          name="base_price"
          type="number"
          min="0"
          max="1000"
          step="0.01"
          value={newProduct.base_price}
          onChange={handleInputChange}
          placeholder="Preço base"
        />
        <div>
          <label>Imagem</label>
          <select
            value={newProduct.image_id}
            name="image_id"
            onChange={handleInputChange}
          >
            {images.length &&
              images.map(image => (
                <option key={image.id} value={image.id}>
                  {image.original_name}
                </option>
              ))}
            <option value="" />
          </select>
        </div>
        <div>
          <label>Categoria</label>
          <select
            value={newProduct.category_id}
            name="category_id"
            onChange={handleInputChange}
          >
            {categories.length &&
              categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            <option value="" />
          </select>
        </div>
        <div>
          <label>Tamanhos</label>
          <select
            multiple
            value={newProduct.product_sizes}
            name="product_sizes"
            onChange={e => {
              handleProductSizesChange(e);
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
        <button type="submit">{loading ? "Carregando..." : "Salvar"}</button>
        <button type="button" className="close" onClick={() => closeModal()}>
          Fechar
        </button>
      </ProductForm>
    </Container>
  );
}

ProductForm.propTypes = {
  name: PropTypes.string,
  base_price: PropTypes.string,
  image_id: PropTypes.number,
  category_id: PropTypes.number,
  product_sizes: PropTypes.arrayOf(PropTypes.number)
};

export default ProductModal;
