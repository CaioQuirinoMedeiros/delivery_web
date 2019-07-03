import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  padding: 25px 50px;

  & > button {
    position: absolute;
    bottom: 20px;
    right: 40px;
    background: #f15454;
    color: #fff;
    width: 80px;
    height: 80px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 50%;
    transition: all 0.3s;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const CategoryCard = styled.div`
  width: 100%;
  flex-grow: 0;
  display: flex;
  padding: 30px;
  margin: 10px 0;
  position: relative;

  box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.75);
  border-radius: 10px;

  & > button {
    position: absolute;
    color: #fff;
    right: 15px;
    top: 15px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    background: #e62638;
    transition: all 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  img {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-right: 10px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    strong {
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      font-size: 13px;
      color: #706e7b;
    }
  }
`;
