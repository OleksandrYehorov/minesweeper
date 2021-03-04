import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { match, __ } from 'ts-pattern';
import styled, { css } from 'styled-components/macro';
import { useLongPress, LongPressDetectEvents } from 'use-long-press';
import { shadow } from '../styles/shadow';
import { Coords } from '../utils/constants';
import { MinesNumber } from './MinesNumber';
import mineImage from '../images/mine.svg';
import crossedMineImage from '../images/crossedMine.svg';
import flagImage from '../images/flag.svg';
import { useTypedSelector } from '../utils/useTypedSelector';
import { clickCell, clickNumberCell, flagCell } from '../redux/gameSlice';
import { preventDefault } from '../utils/preventDefault';

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

type Props = Coords;

const CellIcon = styled.img`
  width: 80%;
`;

export const Cell: FC<Props> = memo(({ x, y }) => {
  const gameStatus = useTypedSelector((state) => state.game.status);
  const cellData = useTypedSelector((state) => state.game.board[y][x]);
  const dispatch = useDispatch();

  const handleClickCell = () => dispatch(clickCell({ x, y }));
  const handleClickNumberCell = () => dispatch(clickNumberCell({ x, y }));
  const handleFlagCell = () => dispatch(flagCell({ x, y }));

  const longTouchProps = useLongPress(handleFlagCell, {
    detect: LongPressDetectEvents.TOUCH,
  });

  const ariaLabel = `Cell ${x + 1} on row ${y + 1}`;

  return match([cellData, gameStatus] as const)
    .with([{ isOpen: true, isMine: true }, __], ([matchedData]) => (
      <OpenCell
        data-testid={`cell${matchedData.id}`}
        aria-label={ariaLabel}
        exploded={matchedData.isMine}
      >
        <CellIcon src={mineImage} alt="Mine" />
      </OpenCell>
    ))
    .with([{ isOpen: true, isMine: false }, __], ([matchedData]) => (
      <OpenCell
        data-testid={`cell${matchedData.id}`}
        aria-label={ariaLabel}
        onClick={handleClickNumberCell}
        exploded={matchedData.isMine}
      >
        <MinesNumber value={matchedData.adjacentMines} />
      </OpenCell>
    ))
    .with([{ isMine: true, isFlagged: false }, 'lose'], ([matchedData]) => (
      <OpenCell data-testid={`cell${matchedData.id}`} aria-label={ariaLabel}>
        <CellIcon src={mineImage} alt="Mine" />
      </OpenCell>
    ))
    .with([{ isMine: false, isFlagged: true }, 'lose'], ([matchedData]) => (
      <OpenCell data-testid={`cell${matchedData.id}`} aria-label={ariaLabel}>
        <CellIcon src={crossedMineImage} alt="Crossed mine" />
      </OpenCell>
    ))
    .with([{ isFlagged: true }, __], ([matchedData]) => (
      <ClosedCell
        data-testid={`cell${matchedData.id}`}
        aria-label={ariaLabel}
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
        data-testid={`cell${cellData.id}`}
        aria-label={ariaLabel}
        disabled={cellData.isFlagged}
        onClick={handleClickCell}
        onContextMenu={preventDefault(handleFlagCell)}
        onTouchStart={longTouchProps.onTouchStart}
        onTouchEnd={longTouchProps.onTouchEnd}
      />
    ));
});
