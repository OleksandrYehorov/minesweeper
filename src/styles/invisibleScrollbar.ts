import { css } from 'styled-components';

export const invisibleScrollbar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
