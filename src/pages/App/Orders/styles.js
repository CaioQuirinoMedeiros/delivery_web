import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  padding: 25px 50px;
`;

export const OrderCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin: 10px 0;

  box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.75);
  border-radius: 10px;

  & > div.orderHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: 18px;
      font-weight: normal;
    }

    select {
      cursor: pointer;
      padding: 5px;
      border: none;
      border-radius: 10px;
      font-weight: bold;
      color: #fff;
      opacity: 0.7;
      transition: all 0.3s;
      background: ${({ status }) =>
        status === "pendente"
          ? "orange"
          : status === "cancelado"
          ? "red"
          : "green"};

      &:hover {
        opacity: 1;
      }
    }
  }

  & > p {
    font-size: 12px;
    color: #706e7b;
    margin: 8px 0;
  }

  strong {
    font-size: 16px;
  }

  & > span {
    font-size: 14px;
    color: #706e7b;
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0 10px;
  margin: 10px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

export const ItemCard = styled.div`
  display: flex;
  width: 230px;
  flex-shrink: 0;
  padding: 10px;
  margin: 0 10px 10px 0;

  border-radius: 10px;
  border: 1px solid #ddd;

  & > img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 8px;

    span {
      font-size: 13px;
    }

    p {
      margin-top: 5px;
      font-size: 11px;
      color: #706e7b;
    }
  }
`;

export const Filters = styled.div`
  align-self: flex-start;
  display: flex;
  flex-wrap: wrap;

  & > div {
    width: 90px;
    text-align: center;
    padding: 10px 5px;
    border-radius: 10px;
    border: 1px solid #ddd;
    margin: 0 10px 15px 0;
    cursor: pointer;
    transition: all 0.3s;

    &:hover,
    &.active {
      background: #f15454;
      border-color: #f15454;
      color: #fff;
    }
  }
`;
