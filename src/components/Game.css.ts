import { style } from '@vanilla-extract/css';
import { shadow } from '../styles/shadow.css';

export const game = style([
  shadow,
  {
    boxSizing: 'border-box',
    padding: '0.4rem',
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 'calc(100% - 2rem)',
    maxHeight: 'calc(100% - 2rem)',
    '@media': {
      'screen and (max-width: 768px)': {
        maxWidth: 'calc(100% - 1rem)',
        maxHeight: 'calc(100% - 1rem)',
      },
    },
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
]);
