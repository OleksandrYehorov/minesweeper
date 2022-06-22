import { EffectCallback, FC, useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import { useGameStore } from '../store/gameStore';
import { Digits } from './Digits';

export const Timer: FC = () => {
  const [value, setValue] = useState(0);
  const gameStatus = useGameStore((state) => state.status);

  useEffect(() => {
    let interval: number | undefined;

    return match(gameStatus)
      .with('playing', (): ReturnType<EffectCallback> => {
        interval = window.setInterval(() => {
          setValue((stateValue) => stateValue + 1);
        }, 1000);

        return () => window.clearInterval(interval);
      })
      .with('lose', 'win', () => {
        window.clearInterval(interval);
      })
      .with('starting', () => {
        setValue(0);
      })
      .run();
  }, [gameStatus]);

  return <Digits value={value} aria-label="timer" />;
};
