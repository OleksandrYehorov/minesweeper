import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { clickCell, flagCell } from '../redux/gameSlice';
import { invertedShadow } from '../styles/shadow';
import { Coords } from '../utils/constants';
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
  const dispatch = useDispatch();
  const board = useTypedSelector((state) => state.game.board);

  const handleClick = (coords: Coords) => dispatch(clickCell(coords));

  const handleRightClick = (coords: Coords) => dispatch(flagCell(coords));

  return (
    <Container>
      {board.map((row, y) => (
        <Row key={row[0].id}>
          {row.map((cell, x) => (
            <Cell
              key={cell.id}
              data={cell}
              coords={{ x, y }}
              onClick={handleClick}
              onRightClick={handleRightClick}
            />
          ))}
        </Row>
      ))}
    </Container>
  );
};
