import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  form {
    display: flex;
    align-items: center;

    input {
      width: 300px;
    }

    > button {
      margin-left: 8px;
    }

    svg {
      font-size: 20px;
    }
  }
`;
