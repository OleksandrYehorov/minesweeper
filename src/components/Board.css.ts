import { style } from '@vanilla-extract/css';
import { invisibleScrollbar } from '../styles/invisibleScrollbar.css';
import { invertedShadow } from '../styles/shadow.css';

export const board = style([
  invertedShadow,
  invisibleScrollbar,
  {
    boxSizing: 'border-box',
    width: '100%',
    overflow: 'scroll',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop: '0.4rem',
    marginBottom: '0.4rem',
  },
]);

export const row = style({
  display: 'flex',
});
