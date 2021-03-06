import { FC, useCallback, useEffect } from 'react';
import styled from 'styled-components/macro';
import { invertedShadow, shadow } from '../styles/shadow';
import { Difficulty, difficultyLevels } from '../utils/constants';
import { useQueryString } from '../utils/useQueryString';
import { useGameStore } from '../store/store';

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

export const DifficultySelect: FC = () => {
  const difficultyState = useGameStore((state) => state.difficulty);
  const initGame = useGameStore((state) => state.initGame);
  const [difficultyQuery, setDifficultyQuery] = useQueryString<Difficulty>(
    'difficulty',
    'beginner'
  );

  const handleClick = useCallback(
    (difficulty: Difficulty) => {
      initGame(difficulty);
      setDifficultyQuery(difficulty);
    },
    [initGame, setDifficultyQuery]
  );

  useEffect(() => {
    handleClick(difficultyQuery);
  }, [difficultyQuery, handleClick]);

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
