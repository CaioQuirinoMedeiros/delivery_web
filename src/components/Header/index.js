import React, { Component } from "react";
import PropTypes from "prop-types";

import logo from "../../assets/images/logo2x.png";

import { logout } from "../../services/auth";

import { Container, LogoContainer, LogoutContainer } from "./styles";

class Header extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  componentDidMount() {}

  handleLogout = () => {
    const { history } = this.props;

    logout();
    history.push("/");
  };

  render() {
    return (
      <Container>
        <LogoContainer>
          <img src={logo} alt="logo" />
          <h1>Pizzaria Don Juan</h1>
        </LogoContainer>
        <LogoutContainer>
          <div>
            <h3>Caio Quirino</h3>
            <button type="button" onClick={() => this.handleLogout()}>
              Sair do app
            </button>
          </div>
        </LogoutContainer>
      </Container>
    );
  }
}

export default Header;
