import { FC } from 'react';
import { isFlagged } from '../services/cell';
import { useGameStore } from '../store/store';
import { boardSizes } from '../utils/constants';
import { Digits } from './Digits';

export const MinesCounter: FC = () => {
  const difficulty = useGameStore((store) => store.difficulty);
  const board = useGameStore((store) => store.board);
  const { mines } = boardSizes[difficulty];
  const flaggedCellsCount = board.flat().filter(isFlagged).length;
  const minesLeft = mines - flaggedCellsCount;

  return <Digits value={minesLeft} aria-label="mines count" />;
};
