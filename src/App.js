import React from "react";
import "react-toastify/dist/ReactToastify.css";

import Toastify from './components/Toastify'
import GlobalStyle from "./styles";
import Routes from "./routes";

const App = () => (
  <>
    <GlobalStyle />
    <Routes />
    <Toastify />
  </>
);

export default App;
