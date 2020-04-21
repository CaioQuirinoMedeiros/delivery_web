import styled from 'styled-components';
import fundo from '../../assets/images/fundo.jpg';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), ${`url(${fundo})`};
  background-position: center;
  background-size: cover;
`;

export const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 72px;
    height: 72px;
    margin-bottom: 10px;
  }

  input {
    width: 350px;
    padding: 15px;
    margin: 5px 0;
    border-radius: 5px;
    border: none;
    font-size: 15px;

    &::placeholder {
      color: #999;
    }
  }

  button {
    width: 350px;
    padding: 15px;
    margin: 5px 0;
    border-radius: 5px;
    background: #f15454;
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    transition: all 0.3s;

    &:hover {
      background: #e62638;
    }
  }
`;

export const TesteToast = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-bottom: 1rem;
  }

  span {
    color: #666;
    margin-bottom: 5px;
  }

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: #f15454;
    font-weight: bold;
    font-size: 15px;
    margin-top: 2rem;
    transition: all 0.2s;

    &:hover {
      color: #e62638;
    }
  }
`
