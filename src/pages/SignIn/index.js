import React, { Component } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import api from "../../services/api";
import { login } from "../../services/auth";

import { Container, SignInForm } from "./styles";
import logo from "../../assets/images/logo2x.png";

class SignIn extends Component {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }).isRequired
  };

  state = {
    email: "",
    password: "",
    loading: false
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignInSubmit = async e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { history } = this.props;

    try {
      this.setState({ loading: true });

      const { data } = await api.post("sessions", { email, password });

      if (data.roles.includes("admin")) {
        login(data.token);

        history.push("/app");

        toast.success("Bem-vindo");
      } else {
        toast.error("Você não é um administrador");
      }
    } catch (err) {
      console.log(err);
      toast.error("Credenciais inválidas");
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, password, loading } = this.state;

    return (
      <Container>
        <SignInForm onSubmit={this.handleSignInSubmit}>
          <img src={logo} alt="logo" />

          <input
            type="email"
            name="email"
            value={email}
            onChange={e => this.handleInputChange(e)}
            placeholder="Seu e-mail"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => this.handleInputChange(e)}
            placeholder="Senha secreta"
          />

          <button type="submit">{loading ? "Carregando..." : "Entrar"}</button>
        </SignInForm>
      </Container>
    );
  }
}

export default SignIn;
