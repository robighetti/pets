import styled from 'styled-components';

export const Container = styled.button`
  background: ${({ theme }) => theme.primary};
  height: 56px;
  border-radius: 8px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  color: ${({ theme }) => theme.background};
  font-weight: bold;
  font-size: 18px;
  margin-top: 16px;

  transition: all 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;
