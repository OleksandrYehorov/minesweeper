import { FC } from 'react';
import { match } from 'ts-pattern';
import dizzyFace from '../images/dizzy-face.png';
import smilingFaceWithSunglasses from '../images/smiling-face-with-sunglasses.png';
import smilingFace from '../images/smiling-face.png';
import { GameStatus, useGameStore } from '../store/gameStore';
import { button } from './StartGameButton.css';

const width = 28;
const height = 28;

const emojisPattern = (status: GameStatus) =>
  match(status)
    .with('starting', () => (
      <img src={smilingFace} alt="smiling face" width={width} height={height} />
    ))
    .with('playing', () => (
      <img src={smilingFace} width={width} height={height} alt="smiling face" />
    ))
    .with('win', () => (
      <img
        src={smilingFaceWithSunglasses}
        alt="smiling face with sunglasses"
        width={width}
        height={height}
      />
    ))
    .with('lose', () => (
      <img src={dizzyFace} alt="dizzy face" width={width} height={height} />
    ))
    .run();

export const StartGameButton: FC = () => {
  const gameStatus = useGameStore((state) => state.status);
  const initGame = useGameStore((state) => state.initGame);

  const handleClick = () => initGame();

  return (
    <button aria-label="restart" onClick={handleClick} className={button}>
      {emojisPattern(gameStatus)}
    </button>
  );
};
