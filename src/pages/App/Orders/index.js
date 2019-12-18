import React, { useState, useEffect, useReducer } from 'react'
import { distanceInWordsToNow } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { toast } from 'react-toastify'

import { convertToBRL } from '../../../services/currency'
import api from '../../../services/api'

import NoImage from '../../../assets/images/no-image.jpg'

import {
  Container,
  OrderCard,
  ItemsContainer,
  ItemCard,
  ItemImage,
  Filters
} from './styles'

const INITIAL_STATE = {
  pendente: true,
  cancelado: false,
  pago: true,
  enviado: true,
  finalizado: false
}

function filterReducer (state, action) {
  switch (action.type) {
    case 'pendente':
      return { ...state, pendente: !state.pendente }
    case 'cancelado':
      return { ...state, cancelado: !state.cancelado }
    case 'pago':
      return { ...state, pago: !state.pago }
    case 'enviado':
      return { ...state, enviado: !state.enviado }
    case 'finalizado':
      return { ...state, finalizado: !state.finalizado }
    default:
      return state
  }
}

function Orders () {
  const [orders, setOrders] = useState([])
  const [filters, dispatch] = useReducer(filterReducer, INITIAL_STATE)

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders () {
    try {
      const { data } = await api.get('admin/orders')

      setOrders(data)
    } catch (err) {
      toast.error('Erro ao buscar os pedidos')
    }
  }

  async function updateOrderStatus (id, status) {
    try {
      await api.put(`admin/orders/${id}`, { status })

      await loadOrders()

      toast.success('Pedido atualizado!')
    } catch (err) {
      toast.error('Não foi possível atualizar o pedido')
    }
  }

  function renderFilters () {
    return (
      <Filters>
        {Object.keys(filters).map(filter => (
          <div
            key={filter}
            onClick={() => dispatch({ type: filter })}
            className={filters[filter] ? 'active' : ''}
          >
            {filter}
          </div>
        ))}
      </Filters>
    )
  }

  function renderOrder (order) {
    return filters[order.status] ? (
      <OrderCard key={order.id} status={order.status}>
        <div className='orderHeader'>
          <h2>
            Pedido <strong>#{order.id}</strong> - {order.user.name}
          </h2>
          <select
            name='status'
            value={order.status}
            onChange={e => updateOrderStatus(order.id, e.target.value)}
          >
            <option value='pendente'>pendente</option>
            <option value='cancelado'>cancelado</option>
            <option value='enviado'>enviado</option>
            <option value='pago'>pago</option>
            <option value='finalizado'>finalizado</option>
          </select>
        </div>
        <p>
          {distanceInWordsToNow(order.created_at, {
            locale: pt,
            addSuffix: true
          })}
        </p>
        <strong>{convertToBRL(Number(order.total))}</strong>
        <ItemsContainer>
          {order.items.map(item => renderItem(item))}
        </ItemsContainer>
        <span>
          <strong>Observações: </strong>
          {order.observations}
        </span>
      </OrderCard>
    ) : null
  }

  function renderItem (item) {
    return (
      <ItemCard key={item.id}>
        <ItemImage
          imageUrl={
            item.product_size.product.image
              ? item.product_size.product.image.url
              : NoImage
          }
        />
        <div>
          <span>{item.product_size.product.name}</span>
          <p>Tamanho: {item.product_size.size.name}</p>
          <p>Quantidade: {item.quantity}</p>
        </div>
      </ItemCard>
    )
  }

  return (
    <Container>
      {renderFilters()}
      {orders.map(order => renderOrder(order))}
    </Container>
  )
}

export default Orders
