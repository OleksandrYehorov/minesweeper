import { FC } from 'react';
import { center, header, left, right } from './Header.css';
import { MinesCounter } from './MinesCounter';
import { StartGameButton } from './StartGameButton';
import { Timer } from './Timer';

export const Header: FC = () => {
  return (
    <header className={header}>
      <div className={left}>
        <MinesCounter />
      </div>
      <div className={center}>
        <StartGameButton />
      </div>
      <div className={right}>
        <Timer />
      </div>
    </header>
  );
};
