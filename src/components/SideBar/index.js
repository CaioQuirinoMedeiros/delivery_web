import React from "react";
import PropTypes from "prop-types";

import Container from "./styles";

const SideBar = ({ page, changePage }) => (
  <Container page={page}>
    <li
      className={page === "Orders" ? "active" : ""}
      onClick={() => changePage("Orders")}
    >
      Pedidos
    </li>
    <li
      className={page === "Categories" ? "active" : ""}
      onClick={() => changePage("Categories")}
    >
      Categorias
    </li>
    <li
      className={page === "Products" ? "active" : ""}
      onClick={() => changePage("Products")}
    >
      Produtos
    </li>
  </Container>
);

SideBar.propTypes = {
  page: PropTypes.string,
  changePage: PropTypes.func.isRequired
};

SideBar.defaultProps = {
  page: "Orders"
};

export default SideBar;