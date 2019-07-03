import styled from "styled-components";
import { FaTrash, FaPlusCircle } from "react-icons/fa";

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
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  margin: 10px 0;
  box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
`;

export const CategoryInfo = styled.div`
  display: flex;

  img {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }

  div {
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
  }
`;

export const DeleteCategoryButton = styled(FaTrash).attrs({
  size: 24
})`
  flex-shrink: 0;
  color: #f15454;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #e62638;
  }
`;

export const AddCategoryButton = styled(FaPlusCircle).attrs({
  size: 46
})`
  flex-shrink: 0;
  margin-top: 10px;
  color: #f15454;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #e62638;
  }
`;
