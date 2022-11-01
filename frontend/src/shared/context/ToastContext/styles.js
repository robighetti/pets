import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 8px;
  margin-left: 8px;
  strong {
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  span {
    font-size: 16px;
    margin-top: 8px;
    text-align: justify;
  }
`;
