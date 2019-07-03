import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  flex-direction: column;
  align-items: center;
  padding: 25px 50px;
`;

export const ProductCard = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin: 10px 0;
  box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  cursor: default;
  transition: all 0.3s;

  &:hover {
    background: #f9f9f9;
  }
`;

export const ProductTop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

export const ProductImage = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  background: ${props => `url(${props.imageUrl})`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;

  strong {
    font-size: 18px;
  }

  p {
    margin-top: 10px;
    font-size: 13px;
    color: #706e7b;

    span {
      color: #555;
      font-weight: bold;
    }
  }
`;

export const ProductInfo = styled.div`
  display: flex;
`;

export const ProductBottom = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;

  p {
    margin: 0px 20px 10px 0;
    font-size: 13px;
    color: #706e7b;
    flex-shrink: 0;

    span {
      color: #555;
      font-weight: bold;
    }
  }
`;
