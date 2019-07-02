import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from './styles';

class SideBar extends Component {
  static propTypes = {
    match: PropTypes.shape().isRequired,
  };

  state = {
    activeLink: '',
  };

  componentDidMount() {}

  linkSelect = (e) => {
    if (e.target.tagName !== 'A') return;
    this.setState({ activeLink: e.target.textContent });
  };

  render() {
    const { match } = this.props;
    const { activeLink } = this.state;
    return (
      <Container onClick={e => this.linkSelect(e)} activeLink={activeLink}>
        <Link className={activeLink === 'Pedidos' ? 'active' : ''} to={`${match.url}/orders`}>
          Pedidos
        </Link>
        <Link
          className={activeLink === 'Categorias' ? 'active' : ''}
          to={`${match.url}/categories`}
        >
          Categorias
        </Link>
        <Link className={activeLink === 'Produtos' ? 'active' : ''} to={`${match.url}/products`}>
          Produtos
        </Link>
      </Container>
    );
  }
}

export default SideBar;
