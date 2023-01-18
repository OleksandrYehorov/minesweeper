import { style } from '@vanilla-extract/css';
import { invertedShadow } from '../styles/shadow.css';

export const header = style([
  invertedShadow,
  {
    padding: '0.2rem',
    display: 'flex',
  },
]);

export const left = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flex: 1,
  overflow: 'hidden',
});

export const center = style({
  display: 'flex',
  alignItems: 'center',
});

export const right = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flex: 1,
  overflow: 'hidden',
});
