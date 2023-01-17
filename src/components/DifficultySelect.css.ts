import { style } from '@vanilla-extract/css';
import { invertedShadow, shadow } from '../styles/shadow.css';
import { recipe } from '@vanilla-extract/recipes';

export const select = style([
  invertedShadow,
  {
    display: 'flex',
    flexDirection: 'column',
  },
]);

export const button = recipe({
  base: [
    shadow,
    {
      margin: 0,
      padding: '0.2rem',
      outline: 'none',
      cursor: 'pointer',
      textTransform: 'capitalize',
      flexGrow: 1,
      color: 'black',
    },
  ],
  variants: {
    active: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0.6,
      },
    },
  },
});
