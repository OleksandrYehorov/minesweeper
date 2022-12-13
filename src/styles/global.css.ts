import { globalFontFace, globalStyle } from '@vanilla-extract/css';

globalFontFace('DSEG7-Classic', {
  src: [
    `url("/fonts/DSEG14Classic/DSEG14Classic-Bold.woff2") format('woff2')`,
    `url("/fonts/DSEG14Classic/DSEG14Classic-Bold.woff") format('woff')`,
    `url("/fonts/DSEG14Classic/DSEG14Classic-Bold.ttf") format('truetype')`,
  ],
  fontWeight: 'bold',
  fontStyle: 'normal',
  fontDisplay: 'swap',
});

globalStyle('html, body, #root', {
  height: '100%',
});

globalStyle('body', {
  margin: 0,
  backgroundColor: '#008080',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: '30%',
  overscrollBehavior: 'none',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('img', {
  pointerEvents: 'none',
});

// Scroll overflow hack for Safari
globalStyle('html, body', {
  position: 'fixed',
  overflow: 'hidden',
});

// Scroll overflow hack for Safari
globalStyle('#root', {
  width: '100vw',
  height: '100vh',
  overflowY: 'auto',
});
