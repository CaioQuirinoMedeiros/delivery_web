import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";

import { DeleteButton as DeleteButtonComponent } from "../../../styles/buttons";

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

export const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ImageCard = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  width: 230px;
  border-radius: 10px;
  box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.75);
  margin: 10px;
  transition: all 0.3s;
  position: relative;

  input {
    align-self: stretch;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ddd;
    margin-top: 15px;
  }
`;

export const ImageContainer = styled.a`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  background: ${props => `url(${props.imageUrl})`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`;

export const DeleteButton = styled(DeleteButtonComponent)`
  position: absolute;
  align-self: flex-end;
`
