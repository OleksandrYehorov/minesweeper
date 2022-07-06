import { FC, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { invertedShadow, shadow } from '../styles/shadow';
import { Difficulty, difficultyLevels } from '../utils/constants';
import { useQueryString } from '../utils/useQueryString';
import { gameState, initGame } from '../state/gameState';
import { useSnapshot } from 'valtio';

interface ButtonProps {
  active?: boolean;
}

export const DifficultySelect: FC = () => {
  const { difficulty } = useSnapshot(gameState);
  // TODO: consider using valtio subscribeKey
  const [difficultyQuery, setDifficultyQuery] = useQueryString<Difficulty>(
    'difficulty',
    'beginner',
  );

  const handleClick = useCallback(
    (difficulty: Difficulty) => {
      // TODO: resize window https://web.dev/learn/pwa/windows/
      initGame(difficulty);
      setDifficultyQuery(difficulty);
    },
    [setDifficultyQuery],
  );

  useEffect(() => {
    handleClick(difficultyQuery);
  }, [difficultyQuery, handleClick]);

  return (
    <Select>
      {difficultyLevels.map((difficultyLevel) => (
        <Button
          key={difficultyLevel}
          active={difficulty === difficultyLevel}
          onClick={() => handleClick(difficultyLevel)}
        >
          {difficultyLevel}
        </Button>
      ))}
    </Select>
  );
};

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
  color: black;
`;
