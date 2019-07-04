import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
`;

export const ProductForm = styled.form`
  display: flex;
  width: 450px;
  flex-direction: column;
  padding: 50px;
  background: #fff;
  border-radius: 10px;

  h2 {
    text-align: center;
    margin-bottom: 10px;
  }

  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 20px;

    label {
      color: #757575;
      margin-right: 15px;
    }

    select {
      border-radius: 10px;
      border: 1px solid #ddd;

      padding: 15px;
      flex: 1;
    }
  }

  input {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    margin-top: 10px;
  }

  button {
    font-size: 16px;
    width: 100%;
    margin-top: 10px;
    text-align: center;
    padding: 15px;
    border-radius: 10px;
    background: #f15454;
    color: #fff;
    font-weight: bold;
    transition: all 0.2s;

    &:hover {
      background: #e62638;
    }

    &:first-of-type {
      margin-top: 20px;
    }
  }

  button.close {
    background: #fff;
    color: inherit;
    padding: 5px;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;
