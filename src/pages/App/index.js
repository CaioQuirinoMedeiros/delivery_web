import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import SideBar from "../../components/SideBar";
import Header from "../../components/Header";

import Orders from "./Orders";
import Categories from "./Categories";
import Sizes from "./Sizes";
import Products from "./Products";
import Images from "./Images";

import { Container, Main } from "./styles";

class App extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  state = {
    activePage: "Orders"
  };

  changePage = page => {
    this.setState({ activePage: page });
  };

  render() {
    const { activePage } = this.state;
    const { history } = this.props;

    return (
      <Container>
        <Header history={history} />
        <Main>
          <SideBar page={activePage} changePage={this.changePage} />

          {activePage === "Orders" ? (
            <Orders />
          ) : activePage === "Categories" ? (
            <Categories />
          ) : activePage === "Sizes" ? (
            <Sizes />
          ) : activePage === "Products" ? (
            <Products />
          ) : activePage === "Images" ? (
            <Images />
          ) : null}
        </Main>
      </Container>
    );
  }
}

export default App;
