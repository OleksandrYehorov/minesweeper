import { css } from 'styled-components';

const light = 'white';
const dark = 'grey';

const createShadow = (inverted: boolean) => {
  const topLeftColor = inverted ? dark : light;
  const bottomRightColor = inverted ? light : dark;

  return css`
    background-color: lightgray;
    border-width: 0.2rem;
    border-style: solid;
    border-top-color: ${topLeftColor};
    border-left-color: ${topLeftColor};
    border-bottom-color: ${bottomRightColor};
    border-right-color: ${bottomRightColor};
  `;
};

export const shadow = createShadow(false);

export const invertedShadow = createShadow(true);
