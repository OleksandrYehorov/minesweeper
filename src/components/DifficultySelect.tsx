import { FC, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Difficulty, difficultyLevels } from '../utils/constants';
import { useSearchParams } from '../utils/useSearchParams';
import { button, select } from './DifficultySelect.css';

const initialDifficulty = 'beginner' as Difficulty;

export const DifficultySelect: FC = () => {
  const difficultyState = useGameStore((state) => state.difficulty);
  const initGame = useGameStore((state) => state.initGame);
  const [difficulty, setDifficulty] = useSearchParams(
    'difficulty',
    initialDifficulty,
  );

  useEffect(() => {
    initGame(difficulty);
  }, [difficulty, initGame]);

  return (
    <div className={select}>
      {difficultyLevels.map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => setDifficulty(difficulty)}
          className={button({ active: difficultyState === difficulty })}
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
};
