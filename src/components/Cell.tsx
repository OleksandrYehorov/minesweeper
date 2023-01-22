import { FC, memo } from 'react';
import { match, P } from 'ts-pattern';
import { shallow } from 'zustand/shallow';
import crossedMineImage from '../images/crossedMine.svg';
import flagImage from '../images/flag.svg';
import mineImage from '../images/mine.svg';
import { isFlagged, isNumberCell } from '../services/cell';
import { useGameStore } from '../store/gameStore';
import { Coords } from '../utils/constants';
import { preventDefault } from '../utils/preventDefault';
import { useLongTouch } from '../utils/useLongTouch';
import { cell, flagIcon, mineIcon } from './Cell.css';
import { MinesNumber } from './MinesNumber';

type CellProps = Coords;

export const Cell: FC<CellProps> = memo(({ x, y }) => {
  const { gameStatus, cellData, clickCell, clickNumberCell, flagCell } =
    useGameStore(
      ({ status, board, clickCell, clickNumberCell, flagCell }) => ({
        gameStatus: status,
        cellData: board[y][x],
        clickCell,
        clickNumberCell,
        flagCell,
      }),
      shallow,
    );

  const handleClickCell = () => clickCell({ x, y });
  const handleClickNumberCell = () => clickNumberCell({ x, y });
  const handleFlagCell = () => flagCell({ x, y });

  const longTouchProps = useLongTouch(handleFlagCell);

  function injectTestData({ open }: { open: boolean }) {
    if (import.meta.env.MODE === 'test') {
      return {
        'data-open': open,
        'data-x': x,
        'data-y': y,
      };
    }

    return {};
  }

  return match([cellData, gameStatus] as const)
    .with(['ExplodedMine', P._], () => (
      <button
        aria-label={`Exploded mine`}
        className={cell({ type: 'explodedMine' })}
        {...injectTestData({ open: true })}
      >
        <img src={mineImage} alt="mine" className={flagIcon} />
      </button>
    ))
    .with([P.when(isNumberCell), P._], ([matchedData]) => (
      <button
        aria-label={
          matchedData === 0
            ? `Open cell`
            : `Open cell with ${matchedData} adjacent cells`
        }
        onClick={handleClickNumberCell}
        className={cell()}
        {...injectTestData({ open: true })}
      >
        <MinesNumber value={matchedData} />
      </button>
    ))
    .with(['Mine', 'lose'], () => (
      <button
        aria-label={`Revealed mine`}
        className={cell()}
        {...injectTestData({ open: true })}
      >
        <img src={mineImage} alt="mine" className={flagIcon} />
      </button>
    ))
    .with(['FlaggedEmpty', 'lose'], () => (
      <button
        aria-label={`Flagged cell with no mine`}
        className={cell()}
        {...injectTestData({ open: true })}
      >
        <img src={crossedMineImage} alt="crossed mine" className={mineIcon} />
      </button>
    ))
    .with(['Mine', 'win'], () => (
      <button
        aria-label={`Flagged cell`}
        className={cell({ type: 'flagged' })}
        {...injectTestData({ open: false })}
      >
        <img src={flagImage} alt="flag" className={flagIcon} />
      </button>
    ))
    .with([P.when(isFlagged), P._], () => (
      <button
        aria-label={`Flagged cell`}
        onContextMenu={preventDefault(handleFlagCell)}
        className={cell({ type: 'flagged' })}
        {...longTouchProps}
        {...injectTestData({ open: false })}
      >
        <img src={flagImage} alt="flag" className={flagIcon} />
      </button>
    ))
    .otherwise(() => (
      <button
        aria-label={`Unrevealed cell`}
        disabled={isFlagged(cellData)}
        className={cell({ type: 'unrevealed' })}
        onContextMenu={preventDefault(handleFlagCell)}
        onClick={handleClickCell}
        {...longTouchProps}
        {...injectTestData({ open: false })}
      />
    ));
});
Cell.displayName = 'Cell';
