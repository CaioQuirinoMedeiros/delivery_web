import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import api from '../../../services/api'
import { convertToBRL } from '../../../services/currency'

import NoImage from '../../../assets/images/no-image.jpg'
import ProductModal from '../../../components/ProductModal'

import {
  Container,
  ProductCard,
  ProductTop,
  ProductImage,
  ProductInfo,
  ProductDetails,
  ProductBottom
} from './styles'

import {
  EditDeleteOptions,
  EditButton,
  DeleteButton,
  AddButton
} from '../../../styles/buttons'

function Products () {
  const [products, setProducts] = useState([])
  const [editProduct, setEditProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteToast, setDeleteToast] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (editProduct) {
      setModalOpen(true)
    }
  }, [editProduct])

  useEffect(() => {
    if (!modalOpen) {
      setEditProduct(null)
      loadProducts()
    }
  }, [modalOpen])

  async function loadProducts () {
    try {
      const { data } = await api.get('admin/products')

      setProducts(
        data.map(product => ({
          ...product,
          base_price_formatted: convertToBRL(Number(product.base_price))
        }))
      )
    } catch (err) {
      toast.error('Erro ao buscar produtos')
    }
  }

  function deleteToastNotification (id) {
    if (!toast.isActive(deleteToast)) {
      const toastToDelete = toast.info(
        'Clique aqui para confirmar a operação',
        {
          onClick: () => deleteProduct(id),
          autoClose: 5000
        }
      )

      setDeleteToast(toastToDelete)
    }
  }

  async function deleteProduct (id) {
    try {
      await api.delete(`admin/products/${id}`)

      loadProducts()
      toast.success('Produto deletado!')
    } catch (err) {
      toast.error('Não foi possível deletar o produto')
    }
  }

  function renderProduct (product) {
    return (
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
            <EditButton onClick={() => setEditProduct(product)} />
            <DeleteButton
              onClick={() => deleteToastNotification(product.id)}
            />
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
    )
  }

  return (
    <Container>
      <AddButton onClick={() => setModalOpen(true)} />
      {modalOpen && (
        <ProductModal
          closeModal={() => setModalOpen(false)}
          product={editProduct}
        />
      )}
      {products.map(product => renderProduct(product))}
    </Container>
  )
}

export default Products
