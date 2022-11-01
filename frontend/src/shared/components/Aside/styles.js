import styled from 'styled-components';

export const Container = styled.div`
  grid-area: AS;

  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  hr {
    margin: 0 auto;
    height: 1px;
    width: 90%;
    background: ${({ theme }) => theme.primary};
    opacity: 0.2;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const ProfileContent = styled.div`
  text-align: center;
  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;

    padding: 1px;

    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 5px ${({ theme }) => theme.primary};
  }
`;

export const ProfileInfo = styled.div`
  margin-top: 16px;
  text-align: center;

  h1 {
    font-size: 24px;
  }

  span {
    font-size: 14px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 8px;
  height: calc(100% - 280px);
`;

export const Menu = styled.ul`
  height: 100%;
  margin-top: 8px;
`;

export const MenuItem = styled.li`
  > button {
    color: ${({ theme }) => theme.secondary};
    width: 100%;
    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
      font-size: 16px;
    }

    transition: all 0.3s;

    &:hover {
      transform: translateX(16px);
      width: calc(100% - 16px);
    }
  }

  & + li {
    margin-top: 16px;
  }
`;

export const Logout = styled.div`
  > button {
    color: ${({ theme }) => theme.secondary};
    width: 100%;
    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
      font-size: 16px;
    }

    transition: all 0.3s;

    &:hover {
      transform: translateX(16px);
      width: calc(100% - 16px);
    }
  }
`;
