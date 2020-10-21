import { createGlobalStyle } from 'styled-components/macro';
import dsegWoff2 from 'dseg/fonts/DSEG7-Classic/DSEG7Classic-Bold.woff2';
import dsegWoff from 'dseg/fonts/DSEG7-Classic/DSEG7Classic-Bold.woff';
import dsegTtf from 'dseg/fonts/DSEG7-Classic/DSEG7Classic-Bold.ttf';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@900&display=swap');
  @font-face {
    font-family: 'DSEG7-Classic';
    src: url(${dsegWoff2}) format('woff2'),
    url(${dsegWoff}) format('woff'),
    url(${dsegTtf}) format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  html, body, #root {
    height: 100%; 
  }

  body { 
    margin: 0;
    background-color: #008080;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
