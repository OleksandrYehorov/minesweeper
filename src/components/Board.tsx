import React from 'react';
import styled from 'styled-components/macro';
import { invertedShadow } from '../styles/shadow';
import { useTypedSelector } from '../utils/useTypedSelector';
import { Cell, OpenCell } from './Cell';

const Container = styled.div`
  ${invertedShadow}
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
`;

const Row = styled.div`
  display: flex;

  &:first-child ${OpenCell} {
    border-top-width: 0;
  }

  ${OpenCell}:first-child {
    border-left-width: 0;
  }
`;

export const Board: React.FC = () => {
  const board = useTypedSelector((state) => state.game.board);

  return (
    <Container data-testid="board">
      {board.map((row, y) => (
        <Row key={row[0].id} data-testid="row">
          {row.map((cell, x) => (
            <Cell key={cell.id} data={cell} coords={{ x, y }} />
          ))}
        </Row>
      ))}
    </Container>
  );
};
