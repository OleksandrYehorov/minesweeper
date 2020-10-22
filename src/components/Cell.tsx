import React from 'react';
import styled, { css } from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { shadow } from '../styles/shadow';
import { Coords } from '../utils/constants';
import { MinesNumber } from './MinesNumber';
import mineImage from '../images/mine.svg';
import crossedMineImage from '../images/crossedMine.svg';
import flagImage from '../images/flag.svg';
import { GameCell } from '../utils/board';
import { useTypedSelector } from '../utils/useTypedSelector';
import { clickCell, clickNumberCell, flagCell } from '../redux/gameSlice';

const openCellStyle = css`
  border-color: grey;
  border-style: solid;
  border-width: 0;
  border-top-width: 1px;
  border-left-width: 1px;
`;

export const StyledCell = styled.button`
  box-sizing: border-box;
  width: 1.6rem;
  height: 1.6rem;
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

  if (data.isOpen) {
    return (
      <OpenCell
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
        <OpenCell>
          <CellIcon src={mineImage} alt="Mine" />
        </OpenCell>
      );
    }

    if (!data.isMine && data.isFlagged) {
      return (
        <OpenCell>
          <CellIcon src={crossedMineImage} alt="Crossed mine" />
        </OpenCell>
      );
    }
  }

  return (
    <ClosedCell
      disabled={data.isFlagged}
      onClick={() => {
        dispatch(clickCell(coords));
      }}
      onContextMenu={(event) => {
        event.preventDefault();

        dispatch(flagCell(coords));
      }}
    >
      {(data.isFlagged || status === 'win') && (
        <CellIcon src={flagImage} alt="Flag" />
      )}
    </ClosedCell>
  );
};
