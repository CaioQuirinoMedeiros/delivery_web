import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #0b2031;
  background: #353940;

  a {
    width: 130px;
    text-decoration: none;
    color: #fff;

    padding: 20px 10px;
    border-bottom: 1px solid #0b2031;
    border-top: 1px solid transparent;
    transition: all 0.3s;

    &:hover {
      background: #f15454;
    }
  }

  a.active {
    background: #f15454;
  }
`;
