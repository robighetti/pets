import styled from 'styled-components'

export const Container = styled.div`
  background: ${({ theme }) => theme.background};
  height: 470px;

  border-radius: 8px;

  padding: 16px;

  h1 {
    font-size: 24px;
  }
`;

export const FormContent = styled.div`
  margin-top: 16px;

  display: flex;
  align-items: initial;
  justify-content: space-between;

  form {    
    margin-right: 16px;

    min-width: 750px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const PetContainer = styled.div`
  align-self: center;
  position: relative;  
  margin: 0 auto;

  border: 1px solid ${({ theme }) => theme.primary};
  box-shadow: 0 0 10px ${({ theme }) => theme.primary};

  width: 320px;
  height: 320px;
  border-radius: 50%;

  img {
    width: 320px;
    height: 320px;

    border-radius: 50%;
  }

  label {
    width: 48px;
    height: 48px;
    background: ${({ theme }) => theme.secondary};
    border-radius: 50%;

    position: absolute;
    right: 48px;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.3s;

    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }

    input {
      display: none;
    }

    svg {
      font-size: 24px;
      color: ${({ theme }) => theme.background};
    }
  }
`;

export const SearchButton = styled.div`
  display: flex;
   
   > button {
    width: 150px;
    margin-left: 16px;
    background: transparent;
    border: none;

    transition: all 0.3s;

    svg {
      font-size: 28px;
      color: ${({ theme }) => theme.primary}
    }

    &:hover {
      transform: scale(1.1);
    }


   }
`