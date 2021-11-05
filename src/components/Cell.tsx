import { FC, memo } from 'react';
import { match, when, __ } from 'ts-pattern';
import styled, { css } from 'styled-components/macro';
import { shadow } from '../styles/shadow';
import { Coords } from '../utils/constants';
import { MinesNumber } from './MinesNumber';
import mineImage from '../images/mine.svg';
import crossedMineImage from '../images/crossedMine.svg';
import flagImage from '../images/flag.svg';
import { preventDefault } from '../utils/preventDefault';
import { GameStatus, useGameStore } from '../store/store';
import { useLongPress } from '../utils/useLongPress';
import { isFlagged, isNumberCell } from '../services/cell';

type CellProps = Coords & {
  gameStatus: GameStatus;
};

export const Cell: FC<CellProps> = memo(({ x, y, gameStatus }) => {
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
    .with(['ExplodedMine', __], () => (
      <OpenCell aria-label={`open mine cell x${x} y${y}`} exploded>
        <MineIcon />
      </OpenCell>
    ))
    .with([when(isNumberCell), __], ([matchedData]) => (
      <OpenCell
        aria-label={`open number cell x${x} y${y}`}
        onClick={handleClickNumberCell}
      >
        <MinesNumber value={matchedData} />
      </OpenCell>
    ))
    .with(['Mine', 'lose'], () => (
      <OpenCell aria-label={`open mine cell x${x} y${y}`}>
        <MineIcon />
      </OpenCell>
    ))
    .with(['FlaggedEmpty', 'lose'], () => (
      <OpenCell aria-label={`open flagged cell x${x} y${y}`}>
        <CrossedMineIcon />
      </OpenCell>
    ))
    .with([when(isFlagged), __], () => (
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
        disabled={isFlagged(cellData)}
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
  ${({ exploded = false }) =>
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
