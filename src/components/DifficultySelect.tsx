import { FC, useCallback, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Difficulty, difficultyLevels } from '../utils/constants';
import { useQueryString } from '../utils/useQueryString';
import { button, select } from './DifficultySelect.css';

export const DifficultySelect: FC = () => {
  const difficultyState = useGameStore((state) => state.difficulty);
  const initGame = useGameStore((state) => state.initGame);
  const [difficultyQuery, setDifficultyQuery] = useQueryString<Difficulty>(
    'difficulty',
    'beginner',
  );

  const handleClick = useCallback(
    (difficulty: Difficulty) => {
      initGame(difficulty);
      setDifficultyQuery(difficulty);
    },
    [initGame, setDifficultyQuery],
  );

  useEffect(() => {
    handleClick(difficultyQuery);
  }, [difficultyQuery, handleClick]);

  return (
    <div className={select}>
      {difficultyLevels.map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => handleClick(difficulty)}
          className={button({ active: difficultyState === difficulty })}
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
};
