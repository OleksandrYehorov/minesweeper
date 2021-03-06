import { FC } from 'react';
import styled from 'styled-components/macro';
import { useGameStore } from '../store/store';
import { invisibleScrollbar } from '../styles/invisibleScrollbar';
import { invertedShadow } from '../styles/shadow';
import { preventDefault } from '../utils/preventDefault';
import { Cell, OpenCell } from './Cell';

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

const handleContextMenu = preventDefault();

export const Board: FC = () => {
  const board = useGameStore((state) => state.board);

  return (
    <Container
      data-testid="board"
      onContextMenu={handleContextMenu}
      role="none"
    >
      {board.map((row, y) => (
        <Row key={row[0].id} data-testid="row">
          {row.map((cell, x) => (
            <Cell key={cell.id} x={x} y={y} />
          ))}
        </Row>
      ))}
    </Container>
  );
};
