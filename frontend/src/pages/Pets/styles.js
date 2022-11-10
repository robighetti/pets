import styled from 'styled-components';

export const Container = styled.div``;

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
      color: ${({ theme }) => theme.primary};
    }
  }
`;

export const ImagePet = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
