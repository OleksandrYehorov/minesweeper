import { FC, useEffect, useState } from 'react';
import { useTypedSelector } from '../utils/useTypedSelector';
import { Digits } from './Digits';

export const Timer: FC = () => {
  const [value, setValue] = useState(0);
  const status = useTypedSelector((state) => state.game.status);

  useEffect(() => {
    let interval: number | undefined;

    if (status === 'playing') {
      interval = window.setInterval(() => {
        setValue((stateValue) => stateValue + 1);
      }, 1000);

      return () => {
        window.clearInterval(interval);
      };
    }

    if (status === 'lose' || status === 'win') {
      window.clearInterval(interval);
    }

    if (status === 'starting') {
      setValue(0);
    }
  }, [status]);

  return <Digits value={value} />;
};
