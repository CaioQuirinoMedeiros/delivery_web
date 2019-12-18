import React, { useState } from 'react'

import SideBar from '../../components/SideBar'
import Header from '../../components/Header'

import Orders from './Orders'
import Categories from './Categories'
import Sizes from './Sizes'
import Products from './Products'
import Images from './Images'

import { Container, Main } from './styles'

function App ({ history }) {
  const [activePage, setActivePage] = useState('Orders')

  function changePage (page) {
    setActivePage(page)
  }

  return (
    <Container>
      <Header history={history} />
      <Main>
        <SideBar page={activePage} changePage={changePage} />

        {activePage === 'Orders' ? (
          <Orders />
        ) : activePage === 'Categories' ? (
          <Categories />
        ) : activePage === 'Sizes' ? (
          <Sizes />
        ) : activePage === 'Products' ? (
          <Products />
        ) : activePage === 'Images' ? (
          <Images />
        ) : null}
      </Main>
    </Container>
  )
}

export default App
