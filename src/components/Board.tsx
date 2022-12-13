import { FC } from 'react';
import { useGameStore } from '../store/gameStore';
import { boardSizes } from '../utils/constants';
import { preventDefault } from '../utils/preventDefault';
import { board, row } from './Board.css';
import { Cell } from './Cell';

const handleContextMenu = preventDefault();

export const Board: FC = () => {
  const difficulty = useGameStore((state) => state.difficulty);
  const { height, width } = boardSizes[difficulty];

  return (
    <div
      onContextMenu={handleContextMenu}
      role="none"
      data-testid="board"
      className={board}
    >
      {Array.from({ length: height }).map((_, y) => (
        <div key={y} data-testid="row" className={row}>
          {Array.from({ length: width }).map((_, x) => (
            <Cell key={`x: ${x}, y: ${y}`} x={x} y={y} />
          ))}
        </div>
      ))}
    </div>
  );
};
