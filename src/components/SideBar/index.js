import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

class SideBar extends Component {
  static propTypes = {
    match: PropTypes.shape().isRequired,
  };

  componentDidMount() {}

  render() {
    const { match } = this.props;
    return (
      <div>
        <Link to={`${match.url}/orders`}>Pedidos</Link>
        <Link to={`${match.url}/categories`}>Categories</Link>
        <Link to={`${match.url}/products`}>Products</Link>
      </div>
    );
  }
}

export default SideBar;
