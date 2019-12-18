import React from 'react'

import logo from '../../assets/images/logo2x.png'

import { logout } from '../../services/auth'

import { Container, LogoContainer, LogoutContainer } from './styles'

function Header ({ history }) {
  function handleLogout () {
    logout()
    history.push('/')
  }

  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt='logo' />
        <h1>Pizzaria Don Juan</h1>
      </LogoContainer>
      <LogoutContainer>
        <div>
          <h3>Caio Quirino</h3>
          <button type='button' onClick={handleLogout}>
            Sair do app
          </button>
        </div>
      </LogoutContainer>
    </Container>
  )
}

export default Header
