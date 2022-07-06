import { EffectCallback, FC, useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import { useSnapshot } from 'valtio';
import { gameState } from '../state/gameState';
import { Digits } from './Digits';

export const Timer: FC = () => {
  const { status } = useSnapshot(gameState);
  const [value, setValue] = useState(0);

  // TODO: make precise
  useEffect(() => {
    let interval: number | undefined;

    return match(status)
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
  }, [status]);

  return <Digits value={value} aria-label="timer" />;
};
