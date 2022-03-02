import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Rubik', 'Open Sans', 'Arial', 'Helvetica', sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  html, body {
    min-height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.neutral.veryLightGray};
  }
`;

export default GlobalStyle;
