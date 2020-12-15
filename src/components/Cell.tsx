import React from 'react';
import styled, { css } from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { useLongPress, LongPressDetectEvents } from 'use-long-press';
import { shadow } from '../styles/shadow';
import { Coords } from '../utils/constants';
import { MinesNumber } from './MinesNumber';
import mineImage from '../images/mine.svg';
import crossedMineImage from '../images/crossedMine.svg';
import flagImage from '../images/flag.svg';
import { GameCell } from '../utils/board';
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
  ${({ exploded }) => exploded && 'background-color: red;'}

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

interface Props {
  data: GameCell;
  coords: Coords;
}

const CellIcon = styled.img`
  width: 80%;
`;

export const Cell: React.FC<Props> = ({ coords, data }) => {
  const status = useTypedSelector((state) => state.game.status);
  const dispatch = useDispatch();

  const handleClickCell = () => dispatch(clickCell(coords));

  const handleFlagCell = () => dispatch(flagCell(coords));

  const longTouchProps = useLongPress(handleFlagCell, {
    detect: LongPressDetectEvents.TOUCH,
  });

  if (data.isOpen) {
    return (
      <OpenCell
        data-testid={`cell${data.id}`}
        onClick={() => {
          dispatch(clickNumberCell(coords));
        }}
        exploded={data.isMine}
      >
        {data.isMine ? (
          <CellIcon src={mineImage} alt="Mine" />
        ) : (
          <MinesNumber value={data.adjacentMines} />
        )}
      </OpenCell>
    );
  }

  if (status === 'lose') {
    if (data.isMine && !data.isFlagged) {
      return (
        <OpenCell data-testid={`cell${data.id}`}>
          <CellIcon src={mineImage} alt="Mine" />
        </OpenCell>
      );
    }

    if (!data.isMine && data.isFlagged) {
      return (
        <OpenCell data-testid={`cell${data.id}`}>
          <CellIcon src={crossedMineImage} alt="Crossed mine" />
        </OpenCell>
      );
    }
  }

  return (
    <ClosedCell
      data-testid={`cell${data.id}`}
      disabled={data.isFlagged}
      onClick={handleClickCell}
      onContextMenu={preventDefault(handleFlagCell)}
      onTouchStart={longTouchProps.onTouchStart}
      onTouchEnd={longTouchProps.onTouchEnd}
    >
      {(data.isFlagged || status === 'win') && (
        <CellIcon src={flagImage} alt="Flag" />
      )}
    </ClosedCell>
  );
};
