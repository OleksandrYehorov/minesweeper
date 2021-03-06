import { FC } from 'react';
import { useGameStore } from '../store/store';
import { boardSizes } from '../utils/constants';
import { Digits } from './Digits';

export const MinesCounter: FC = () => {
  const difficulty = useGameStore((store) => store.difficulty);
  const board = useGameStore((store) => store.board);
  const { mines } = boardSizes[difficulty];
  const flaggedCellsCount = board.reduce(
    (res, row) =>
      res +
      row.reduce((rowRes, cell) => (cell.isFlagged ? rowRes + 1 : rowRes), 0),
    0
  );
  const minesLeft = mines - flaggedCellsCount;

  return <Digits value={minesLeft} />;
};
