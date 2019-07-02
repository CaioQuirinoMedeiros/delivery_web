import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import SideBar from '../../components/SideBar';
import Header from '../../components/Header';

import Orders from './Orders';
import Categories from './Categories';
import Products from './Products';

import { Container, Main, Page } from './styles';

const App = (props) => {
  console.log(props);
  return (
    <Container>
      <Header history={props.history} />
      <Main>
        <SideBar match={props.match} />

        <Page>
          <Route path={`${props.match.path}/orders`} component={Orders} />
          <Route path={`${props.match.path}/categories`} component={Categories} />
          <Route path={`${props.match.path}/products`} component={Products} />
        </Page>
      </Main>
    </Container>
  );
};

App.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default App;
