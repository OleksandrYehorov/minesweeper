import { style } from '@vanilla-extract/css';

export const invisibleScrollbar = style({
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});
