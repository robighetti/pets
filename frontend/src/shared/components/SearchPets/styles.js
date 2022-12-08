import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 9999;
`;

export const Content = styled.div`
  background: ${({ theme }) => theme.background};

  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  box-shadow: 0 0 5px ${({ theme }) => theme.secondary};

  width: 750px;

  padding: 16px;
`;

export const Header = styled.header`
  text-align: center;

  h1 {
    font-size: 24px;
  }
`;

export const Description = styled.section`
  margin: 16px 0;
  text-align: center;

  span {
    font-size: 16px;
  }
`;

export const ActionContainer = styled.section`
  margin-top: 24px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  > button {
    width: 180px
  }
`;

export const ActionsButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background: transparent;
    border: 0;

    transition: all 0.3s;
    &:hover {
      transform: scale(1.1);
    }

    svg {
      font-size: 24px;
      color: ${({ theme }) => theme.success_title};
    }
  }
`;

export const ImagePet = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

export const ListPets = styled.div`
  height: 360px;
`;

export const Filter = styled.div`  
  background-color: #fff;
  margin-bottom: 16px;
  border-radius: 16px;

  padding: 16px;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      margin-top: 0 !important;
      margin: 0 8px;
    }

    > button {
      width: 15%;
    }
  }
`;