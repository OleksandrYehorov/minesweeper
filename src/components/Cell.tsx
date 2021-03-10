import { FC, memo } from 'react';
import { match, __ } from 'ts-pattern';
import styled, { css } from 'styled-components/macro';
import { useLongPress, LongPressDetectEvents } from 'use-long-press';
import { shadow } from '../styles/shadow';
import { Coords } from '../utils/constants';
import { MinesNumber } from './MinesNumber';
import mineImage from '../images/mine.svg';
import crossedMineImage from '../images/crossedMine.svg';
import flagImage from '../images/flag.svg';
import { preventDefault } from '../utils/preventDefault';
import { useGameStore } from '../store/store';

const openCellStyle = css`
  border-color: grey;
  border-style: solid;
  border-width: 0;
  border-top-width: 1px;
  border-left-width: 1px;
`;

export const StyledCell = styled.button`
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  outline: none;
  background: none;
`;

export const OpenCell = styled(StyledCell)<{ exploded?: boolean }>`
  ${openCellStyle}
  ${({ exploded }) =>
    exploded &&
    css`
      background-color: red;
    `}

  & > * {
    margin: -1px 0 0 -1px;
  }
`;

export const ClosedCell = styled(StyledCell)`
  ${shadow}

  &:active:not(:disabled) {
    ${openCellStyle}
  }
`;

type CellProps = Coords;

const CellIcon = styled.img`
  width: 80%;
`;

export const Cell: FC<CellProps> = memo(({ x, y }) => {
  const gameStatus = useGameStore((state) => state.status);
  const cellData = useGameStore((state) => state.board[y][x]);
  const clickCell = useGameStore((state) => state.clickCell);
  const clickNumberCell = useGameStore((state) => state.clickNumberCell);
  const flagCell = useGameStore((state) => state.flagCell);

  const handleClickCell = () => clickCell({ x, y });
  const handleClickNumberCell = () => clickNumberCell({ x, y });
  const handleFlagCell = () => flagCell({ x, y });

  const longTouchProps = useLongPress(handleFlagCell, {
    detect: LongPressDetectEvents.TOUCH,
  });

  return match([cellData, gameStatus] as const)
    .with([{ isOpen: true, isMine: true }, __], ([matchedData]) => (
      <OpenCell
        aria-label={`open mine cell x${x} y${y}`}
        exploded={matchedData.isMine}
      >
        <CellIcon src={mineImage} alt="Mine" />
      </OpenCell>
    ))
    .with([{ isOpen: true, isMine: false }, __], ([matchedData]) => (
      <OpenCell
        aria-label={`open number cell x${x} y${y}`}
        onClick={handleClickNumberCell}
        exploded={matchedData.isMine}
      >
        <MinesNumber value={matchedData.adjacentMines} />
      </OpenCell>
    ))
    .with([{ isMine: true, isFlagged: false }, 'lose'], () => (
      <OpenCell aria-label={`open mine cell x${x} y${y}`}>
        <CellIcon src={mineImage} alt="Mine" />
      </OpenCell>
    ))
    .with([{ isMine: false, isFlagged: true }, 'lose'], () => (
      <OpenCell aria-label={`open crossed mine cell x${x} y${y}`}>
        <CellIcon src={crossedMineImage} alt="Crossed mine" />
      </OpenCell>
    ))
    .with([{ isFlagged: true }, __], ([matchedData]) => (
      <ClosedCell
        aria-label={`closed flagged cell x${x} y${y}`}
        disabled={matchedData.isFlagged}
        onClick={handleClickCell}
        onContextMenu={preventDefault(handleFlagCell)}
        onTouchStart={longTouchProps.onTouchStart}
        onTouchEnd={longTouchProps.onTouchEnd}
      >
        <CellIcon src={flagImage} alt="Flag" />
      </ClosedCell>
    ))
    .otherwise(() => (
      <ClosedCell
        aria-label={`closed cell x${x} y${y}`}
        disabled={cellData.isFlagged}
        onClick={handleClickCell}
        onContextMenu={preventDefault(handleFlagCell)}
        onTouchStart={longTouchProps.onTouchStart}
        onTouchEnd={longTouchProps.onTouchEnd}
      />
    ));
});
