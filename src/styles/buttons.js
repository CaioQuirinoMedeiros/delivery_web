import styled from "styled-components";
import { FaTrash, FaEdit, FaPlusCircle } from "react-icons/fa";

import githubIcon from "../assets/images/github-icon.png";

export const EditDeleteOptions = styled.div`
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DeleteButton = styled(FaTrash).attrs({
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

export const EditButton = styled(FaEdit).attrs({
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

export const AddButton = styled(FaPlusCircle).attrs({
  size: 46
})`
  flex-shrink: 0;
  margin-bottom: 10px;
  color: #f15454;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #e62638;
  }
`;
