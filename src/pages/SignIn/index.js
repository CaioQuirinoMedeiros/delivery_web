import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiChevronRight } from "react-icons/fi";

import api from "../../services/api";
import { login } from "../../services/auth";

import { Container, SignInForm, TesteToast } from "./styles";
import logo from "../../assets/images/logo2x.png";

function SignIn({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    if (process.env.REACT_APP_ENVIRONMENT === "demo") {
      toast(
        () => (
          <TesteToast>
            <p>AMBIENTE DE TESTE</p>
            <span>
              <strong>E-mail:</strong> admin@delivery.com
            </span>
            <span>
              <strong>Senha:</strong> 123456
            </span>

            <a
              href="https://github.com/CaioQuirinoMedeiros/delivery_web"
              target="_blank"
              rel="noreferrer noopener"
            >
              Veja no GitHub <FiChevronRight size={20} />
            </a>
          </TesteToast>
        ),
        { autoClose: false, closeOnClick: false }
      );
    }
  }, []);

  async function handleSignInSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

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
      setLoading(false);
    }
  }

  return (
    <Container>
      <SignInForm onSubmit={handleSignInSubmit}>
        <img src={logo} alt="logo" />

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha secreta"
        />

        <button type="submit">{loading ? "Carregando..." : "Entrar"}</button>
      </SignInForm>
    </Container>
  );
}

export default SignIn;
