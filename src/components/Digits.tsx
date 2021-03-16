import { FC } from 'react';
import styled, { css } from 'styled-components/macro';
import { invertedShadow } from '../styles/shadow';

type Props = {
  value: number;
  'aria-label'?: string;
};

export const Digits: FC<Props> = ({ value, 'aria-label': ariaLabel }) => {
  const displayValue = Math.min(value, 999);

  return (
    <Container>
      <GhostNumbers>888</GhostNumbers>
      <Numbers aria-label={ariaLabel}>{displayValue}</Numbers>
    </Container>
  );
};

const Container = styled.div`
  ${invertedShadow}
  position: relative;
  background-color: black;
  height: 2.6rem;
  box-sizing: border-box;
`;

const numbersStyles = css`
  color: red;
  font-family: 'DSEG7-Classic';
  font-weight: bold;
  font-size: 1.8rem;
  letter-spacing: -0.1rem;
  box-sizing: border-box;
  padding: 0.1rem;
`;

const Numbers = styled.div`
  ${numbersStyles}
  position: absolute;
  top: 0;
  right: 0;
`;

const GhostNumbers = styled.div`
  ${numbersStyles}
  opacity: 0.3;
`;
