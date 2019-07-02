import styled from "styled-components";

export default styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #0b2031;
  background: #353940;

  li {
    width: 130px;
    color: #fff;
    cursor: pointer;

    padding: 20px 10px;
    border-bottom: 1px solid #0b2031;
    border-top: 1px solid transparent;
    transition: all 0.3s;

    &:hover {
      background: #f15454;
    }
  }

  li.active {
    background: #f15454;
  }
`;
