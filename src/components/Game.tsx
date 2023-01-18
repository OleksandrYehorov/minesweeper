import { FC } from 'react';
import { Board } from './Board';
import { DifficultySelect } from './DifficultySelect';
import { game } from './Game.css';
import { Header } from './Header';

export const Game: FC = () => {
  return (
    <div className={game}>
      <Header />
      <Board />
      <DifficultySelect />
    </div>
  );
};
