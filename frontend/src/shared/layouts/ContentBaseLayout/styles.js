import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 24px;
`;

export const Content = styled.div`
  margin-top: 16px;
  overflow: auto;
`;

export const Toolbar = styled.div`
  margin-top: 16px;
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;
