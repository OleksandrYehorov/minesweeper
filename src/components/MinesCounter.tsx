import { FC } from 'react';
import { boardSizes } from '../utils/constants';
import { useTypedSelector } from '../utils/useTypedSelector';
import { Digits } from './Digits';

export const MinesCounter: FC = () => {
  const difficulty = useTypedSelector((state) => state.game.difficulty);
  const board = useTypedSelector((state) => state.game.board);
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
