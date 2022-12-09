import { FC } from 'react';
import { useGameStore } from '../store/gameStore';
import { boardSizes } from '../utils/constants';
import { Digits } from './Digits';

export const MinesCounter: FC = () => {
  const flagsCount = useGameStore(
    (state) => state.flaggedEmptyCount + state.flaggedMinesCount,
  );
  const difficulty = useGameStore((state) => state.difficulty);
  const { mines } = boardSizes[difficulty];
  const minesLeft = mines - flagsCount;

  return <Digits value={minesLeft} aria-label="mines count" />;
};
