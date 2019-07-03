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

export const SizeForm = styled.form`
  display: flex;
  width: 400px;
  flex-direction: column;
  padding: 30px;
  background: #fff;
  border-radius: 10px;

  h2 {
    text-align: center;
    margin-bottom: 10px;
  }

  span {
    margin: 5px 0;
    font-size: 13px;
    color: #e62638;
    text-align: center;
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
    width: 100%;
    margin-top: 20px;
    text-align: center;
    padding: 15px;
    border-radius: 10px;
    background: #f15454;
    color: #fff;
    font-weight: bold;
    transition: all 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }

  button.close {
    margin-top: 10px;
    background: #fff;
    color: inherit;
    padding: 5px;
  }
`;
