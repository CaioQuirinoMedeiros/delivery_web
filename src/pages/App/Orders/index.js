import React, { Component } from "react";
import { distanceInWordsToNow } from "date-fns";
import pt from "date-fns/locale/pt";
import { toast } from "react-toastify";

import { convertToBRL } from "../../../services/currency";
import api from "../../../services/api";

import NoImage from "../../../assets/images/no-image.jpg";

import {
  Container,
  OrderCard,
  ItemsContainer,
  ItemCard,
  ItemImage,
  Filters
} from "./styles";

class Orders extends Component {
  state = {
    orders: [],
    filters: {
      pendente: true,
      cancelado: false,
      pago: true,
      enviado: true,
      finalizado: false
    }
  };

  componentDidMount() {
    this.loadOrders();
  }

  loadOrders = async () => {
    try {
      const { data } = await api.get("admin/orders");

      this.setState({ orders: data });
    } catch (err) {
      console.log(err);
      toast.error("Erro ao buscar os pedidos");
    }
  };

  updateOrderStatus = async (id, status) => {
    try {
      await api.put(`admin/orders/${id}`, { status });

      await this.loadOrders();

      toast.success("Pedido atualizado!");
    } catch (err) {
      console.log(err);
      toast.error("Não foi possível atualizar o pedido");
    }
  };

  toggleFilter = filter => {
    this.setState({
      filters: { ...this.state.filters, [filter[0]]: !filter[1] }
    });
  };

  renderFilters = () => {
    const { filters } = this.state;

    return (
      <Filters>
        {Object.entries(filters).map(filter => (
          <div
            onClick={() => this.toggleFilter(filter)}
            key={filter[0]}
            className={filter[1] ? "active" : ""}
          >
            {filter[0]}
          </div>
        ))}
      </Filters>
    );
  };

  renderOrder = order => {
    const { filters } = this.state;

    return filters[order.status] ? (
      <OrderCard key={order.id} status={order.status}>
        <div className="orderHeader">
          <h2>
            Pedido <strong>#{order.id}</strong> - {order.user.name}
          </h2>
          <select
            name="status"
            value={order.status}
            onChange={e => this.updateOrderStatus(order.id, e.target.value)}
          >
            <option value="pendente">pendente</option>
            <option value="cancelado">cancelado</option>
            <option value="enviado">enviado</option>
            <option value="pago">pago</option>
            <option value="finalizado">finalizado</option>
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
          {order.items.map(item => this.renderItem(item))}
        </ItemsContainer>
        <span>
          <strong>Observações: </strong>
          {order.observations}
        </span>
      </OrderCard>
    ) : null;
  };

  renderItem = item => (
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
  );

  render() {
    const { orders } = this.state;
    return (
      <Container>
        {this.renderFilters()}
        {orders.map(order => this.renderOrder(order))}
      </Container>
    );
  }
}

export default Orders;
