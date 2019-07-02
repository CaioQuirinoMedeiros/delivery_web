import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    background: #fff;
    color: #fff;
    font-family: 'Helvetica', "Arial", sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  html, body, #root {
    height: 100%
  }

  input, button {
    font-family: 'Helvetica', "Arial", sans-serif;
  }

  button {
    cursor: pointer;
    border: none;
  }
`;
