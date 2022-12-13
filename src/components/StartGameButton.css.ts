import { style } from '@vanilla-extract/css';
import { invertedShadowRule, shadow } from '../styles/shadow.css';

export const button = style([
  shadow,
  {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    width: '2.6rem',
    height: '2.6rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
    selectors: {
      '&:active': invertedShadowRule,
    },
  },
]);
