import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";

export const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  flex-direction: column;
  padding: 25px 50px;
`;

export const NewImageContainer = styled.div`
  width: 230px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.75);

  input {
    display: none;
  }
`;

export const NewImageButtons = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  margin-top: 5px;

  & > * {
  }

  label {
    flex: 1;
    color: #ccc;
    font-size: 14px;
    font-weight: bold;
    border: 2px dotted #ddd;
    border-radius: 10px;
    padding: 8px;
    margin-right: 5px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: #999;
      color: #888;
    }
  }
`;

export const AddButton = styled(FaPlusCircle).attrs({
  size: 22
})`
  flex-shrink: 0;
  color: #f15454;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #e62638;
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
  margin: 10px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;

  &:hover {
    background: #f9f9f9;
  }

  strong {
    text-align: center;
    margin-top: 10px;
  }
`;

export const ImageContainer = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  background: ${props => `url(${props.imageUrl})`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`;

export const ImageNameAndDelete = styled.div`
  width: 100%;
  display: flex;
  margin-top: 15px;
  align-items: center;

  input {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ddd;
    margin-right: 5px;
  }
`;
