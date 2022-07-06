import { FC } from 'react';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { gameState } from '../state/gameState';
import { invisibleScrollbar } from '../styles/invisibleScrollbar';
import { invertedShadow } from '../styles/shadow';
import { preventDefault } from '../utils/preventDefault';
import { Cell, OpenCell } from './Cell';

const handleContextMenu = preventDefault();

export const Board: FC = () => {
  const { board, status } = useSnapshot(gameState);

  return (
    <Container
      onContextMenu={handleContextMenu}
      role="none"
      data-testid="board"
    >
      {board.map((row, y) => (
        <Row key={y} data-testid="row">
          {row.map((cellData, x) => (
            <Cell
              key={`x: ${x}, y: ${y}`}
              x={x}
              y={y}
              cellData={cellData}
              gameStatus={status}
            />
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
