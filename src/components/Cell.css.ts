import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { shadow } from '../styles/shadow.css';
import { styleHelper } from '../utils/styleHelper';
import { row } from './Board.css';

const [openCellStyle, openCellStyleRules] = styleHelper({
  borderColor: 'grey',
  borderStyle: 'solid',
  borderWidth: '0',
  borderTopWidth: '1px',
  borderLeftWidth: '1px',
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
      width: '28px',
      height: '28px',
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
  width: '18px',
  height: '18px',
});

export const mineIcon = style({
  width: '21px',
  height: '21px',
});
