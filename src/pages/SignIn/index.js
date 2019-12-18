import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import api from "../../services/api";
import { login } from "../../services/auth";

import { Container, SignInForm } from "./styles";
import logo from "../../assets/images/logo2x.png";

function SignIn ({ history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState('')

  async function handleSignInSubmit (e) {
    e.preventDefault();

    try {
      setLoading(true)

      const { data } = await api.post("sessions", { email, password });

      if (data.roles.includes("admin")) {
        login(data.token);

        history.push("/app");

        toast.success("Bem-vindo");
      } else {
        toast.error("Você não é um administrador");
      }
    } catch (err) {
      toast.error("Credenciais inválidas");
    } finally {
      setLoading(false)
    }
  };

    return (
      <Container>
        <SignInForm onSubmit={handleSignInSubmit}>
          <img src={logo} alt="logo" />

          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha secreta"
          />

          <button type="submit">{loading ? "Carregando..." : "Entrar"}</button>
        </SignInForm>
      </Container>
    );
}

export default SignIn;
