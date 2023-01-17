import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { invertedShadow } from '../styles/shadow.css';

export const container = style([
  invertedShadow,
  {
    position: 'relative',
    backgroundColor: 'black',
    height: '2.6rem',
    boxSizing: 'border-box',
  },
]);

export const numbers = recipe({
  base: [
    {
      color: 'red',
      fontFamily: 'DSEG7-Classic',
      fontWeight: 'bold',
      fontSize: '1.8rem',
      letterSpacing: '-0.1rem',
      boxSizing: 'border-box',
      padding: '0.1rem',
    },
  ],
  variants: {
    ghosted: {
      true: {
        opacity: 0.3,
      },
      false: {
        position: 'absolute',
        top: 0,
        right: 0,
      },
    },
  },
  defaultVariants: {
    ghosted: false,
  },
});
