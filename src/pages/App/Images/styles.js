import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  flex-direction: column;
  padding: 25px 50px;
`;

export const NewImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;

  div {
    display: flex;
    flex-direction: column;

    img {
      margin-top: 20px;
      width: 80px;
      height: 80px;
    }
  }

  button {
    font-size: 16px;
    border: none;
    background: #f15454;
    font-weight: bold;
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s;

    &:hover {
      background: #e62638;
    }
  }
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ImageCard = styled.a`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 230px;
  border-radius: 10px;
  box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  margin: 10px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;

  &:hover {
    background: #f5f5f5;
  }

  strong {
    text-align: center;
    margin-top: 10px;
  }

  img {
    width: 80px;
    height: 80px;
  }
`;
