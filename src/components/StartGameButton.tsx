import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { GameStatus, initGame } from '../redux/gameSlice';
import { invertedShadow, shadow } from '../styles/shadow';
import { useTypedSelector } from '../utils/useTypedSelector';

const Button = styled.button`
  ${shadow}
  padding: 0;
  box-sizing: border-box;
  width: 2.6rem;
  height: 2.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;

  &:active {
    ${invertedShadow}
  }
`;

const Emoji = styled.div`
  font-size: 1.4rem;
  margin-top: -0.2rem;
`;

const emojis: Record<GameStatus, string> = {
  starting: '🙂',
  playing: '🙂',
  win: '😎',
  lose: '😵',
};

export const StartGameButton: React.FC = () => {
  const dispatch = useDispatch();
  const status = useTypedSelector((state) => state.game.status);

  const handleClick = () => {
    dispatch(initGame());
  };

  return (
    <Button onClick={handleClick}>
      <Emoji>{emojis[status]}</Emoji>
    </Button>
  );
};
