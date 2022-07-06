import { FC } from 'react';
import { useSnapshot } from 'valtio';
import { gameState } from '../state/gameState';
import { boardSizes } from '../utils/constants';
import { Digits } from './Digits';

export const MinesCounter: FC = () => {
  const { difficulty, flaggedEmptyCount, flaggedMinesCount } =
    useSnapshot(gameState);
  const { mines } = boardSizes[difficulty];
  const flagsCount = flaggedEmptyCount + flaggedMinesCount;
  const minesLeft = mines - flagsCount;

  return <Digits value={minesLeft} aria-label="mines count" />;
};
