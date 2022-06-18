import { FC } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../store/store';
import { invisibleScrollbar } from '../styles/invisibleScrollbar';
import { invertedShadow } from '../styles/shadow';
import { preventDefault } from '../utils/preventDefault';
import { Cell, OpenCell } from './Cell';

const handleContextMenu = preventDefault();

export const Board: FC = () => {
  const board = useGameStore((state) => state.board);
  const gameStatus = useGameStore((state) => state.status);

  return (
    <Container onContextMenu={handleContextMenu} role="none">
      {board.map((row, y) => (
        <Row key={String(row) + y} data-testid="row">
          {row.map((cell, x) => (
            <Cell key={String(cell) + x} x={x} y={y} gameStatus={gameStatus} />
          ))}
        </Row>
      ))}
    </Container>
  );
};

const Container = styled.div`
  ${invertedShadow}
  ${invisibleScrollbar}
  box-sizing: border-box;
  width: 100%;
  overflow: scroll;
  display: flex;
  align-items: flex-start;
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
