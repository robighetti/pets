import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.primary_light};
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.primary_light};
  padding: 16px;
  width: 100%;
  color: ${({ theme }) => theme.secondary};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: ${({ theme }) => theme.text};

    &::placeholder {
      color: ${({ theme }) => theme.secondary};
    }
  }
`;
