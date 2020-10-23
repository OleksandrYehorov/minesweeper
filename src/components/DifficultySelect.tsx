import React from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { invertedShadow, shadow } from '../styles/shadow';
import { Difficulty, difficultyLevels } from '../utils/constants';
import { initGame } from '../redux/gameSlice';
import { useTypedSelector } from '../utils/useTypedSelector';

interface ButtonProps {
  active?: boolean;
}

const Select = styled.div`
  ${invertedShadow}
  display: flex;
  flex-direction: column;
`;

const Button = styled.button<ButtonProps>`
  ${shadow}
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  margin: 0;
  padding: 0.2rem;
  outline: none;
  cursor: pointer;
  text-transform: capitalize;
  flex-grow: 1;
`;

export const DifficultySelect: React.FC = () => {
  const dispatch = useDispatch();
  const difficultyState = useTypedSelector((state) => state.game.difficulty);

  const handleClick = (difficulty: Difficulty) => {
    dispatch(initGame(difficulty));
  };

  return (
    <Select>
      {difficultyLevels.map((difficulty) => (
        <Button
          key={difficulty}
          active={difficultyState === difficulty}
          onClick={() => handleClick(difficulty)}
        >
          {difficulty}
        </Button>
      ))}
    </Select>
  );
};
