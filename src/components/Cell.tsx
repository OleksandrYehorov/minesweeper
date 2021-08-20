import { FC, memo } from 'react';
import { match, __ } from 'ts-pattern';
import styled, { css } from 'styled-components/macro';
import { shadow } from '../styles/shadow';
import { Coords } from '../utils/constants';
import { MinesNumber } from './MinesNumber';
import mineImage from '../images/mine.svg';
import crossedMineImage from '../images/crossedMine.svg';
import flagImage from '../images/flag.svg';
import { preventDefault } from '../utils/preventDefault';
import { useGameStore } from '../store/store';
import { useLongPress } from '../utils/useLongPress';

type CellProps = Coords;

export const Cell: FC<CellProps> = memo(({ x, y }) => {
  const gameStatus = useGameStore((state) => state.status);
  const cellData = useGameStore((state) => state.board[y][x]);
  const clickCell = useGameStore((state) => state.clickCell);
  const clickNumberCell = useGameStore((state) => state.clickNumberCell);
  const flagCell = useGameStore((state) => state.flagCell);

  const handleClickCell = () => clickCell({ x, y });
  const handleClickNumberCell = () => clickNumberCell({ x, y });
  const handleFlagCell = () => flagCell({ x, y });

  const flaggedCellLongPressProps = useLongPress({
    onLongPress: handleFlagCell,
  });
  const closedCellLongPressProps = useLongPress({
    onLongPress: handleFlagCell,
    onClick: handleClickCell,
  });

  return match([cellData, gameStatus] as const)
    .with([{ isOpen: true, isMine: true }, __], ([matchedData]) => (
      <OpenCell
        aria-label={`open mine cell x${x} y${y}`}
        exploded={matchedData.isMine}
      >
        <MineIcon />
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
        <MineIcon />
      </OpenCell>
    ))
    .with([{ isMine: false, isFlagged: true }, 'lose'], () => (
      <OpenCell aria-label={`open flagged cell x${x} y${y}`}>
        <CrossedMineIcon />
      </OpenCell>
    ))
    .with([{ isFlagged: true }, __], () => (
      <ClosedCell
        aria-label={`closed flagged cell x${x} y${y}`}
        onContextMenu={preventDefault(handleFlagCell)}
        isFlagged
        {...flaggedCellLongPressProps}
      >
        <FlagIcon />
      </ClosedCell>
    ))
    .otherwise(() => (
      <ClosedCell
        aria-label={`closed cell x${x} y${y}`}
        disabled={cellData.isFlagged}
        isFlagged={false}
        onContextMenu={preventDefault(handleFlagCell)}
        {...closedCellLongPressProps}
      />
    ));
});

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

const notFlaggedCellStyle = css`
  &:active:not(:disabled) {
    ${openCellStyle}
  }
`;

export const ClosedCell = styled(StyledCell)<{ isFlagged: boolean }>`
  ${shadow}

  ${(props) => (props.isFlagged ? null : notFlaggedCellStyle)}
`;

const FlagIcon = styled.img.attrs({ src: flagImage, alt: 'flag' })`
  width: 18px;
  height: 18px;
`;

const MineIcon = styled.img.attrs({ src: mineImage, alt: 'mine' })`
  width: 21px;
  height: 21px;
`;

const CrossedMineIcon = styled.img.attrs({
  src: crossedMineImage,
  alt: 'crossed mine',
})`
  width: 21px;
  height: 21px;
`;
