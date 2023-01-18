import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { shadow } from '../styles/shadow.css';
import { styleHelper } from '../utils/styleHelper';
import { row } from './Board.css';

const [openCellStyle, openCellStyleRules] = styleHelper({
  borderColor: 'grey',
  borderStyle: 'solid',
  borderWidth: '0',
  // 1px in rems is 0.0625rem
  borderTopWidth: '0.0625rem',
  borderLeftWidth: '0.0625rem',
  selectors: {
    [`${row} &:first-child`]: {
      borderLeftWidth: 0,
    },
  },
});

export const cell = recipe({
  base: [
    {
      boxSizing: 'border-box',
      // 28px in rems is 1.75rem
      width: '1.75rem',
      height: '1.75rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      outline: 'none',
      background: 'none',
    },
  ],
  variants: {
    type: {
      explodedMine: [
        openCellStyle,
        {
          backgroundColor: 'red',
        },
      ],
      open: [
        openCellStyle,
        {
          selectors: {
            [`${row}:first-child &`]: {
              borderTopWidth: 0,
            },
          },
        },
      ],
      flagged: shadow,
      unrevealed: [
        shadow,
        {
          selectors: {
            '&:active:not(:disabled)': openCellStyleRules,
          },
        },
      ],
    },
  },
  defaultVariants: {
    type: 'open',
  },
});

export const flagIcon = style({
  // 18px in rems is 1.125rem
  width: '1.125rem',
  height: '1.125rem',
});

export const mineIcon = style({
  // 21px in rems is 1.3125rem
  width: '1.3125rem',
  height: '1.3125rem',
});
