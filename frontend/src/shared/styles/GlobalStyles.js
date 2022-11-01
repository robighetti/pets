import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');
  }

  html, body, #root {
    height: 100vh;
    font-family: 'ubuntu';
  }

  *, button, input {
    border: 0;
    outline: 0;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

`;
