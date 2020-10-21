import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../utils/useTypedSelector';
import { Digits } from './Digits';

export const Timer: React.FC = () => {
  const [value, setValue] = useState(0);
  const status = useTypedSelector((state) => state.game.status);

  useEffect(() => {
    let interval: number | undefined;

    if (status === 'playing') {
      interval = setInterval(() => {
        setValue((stateValue) => stateValue + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

    if (status === 'lose' || status === 'win') {
      clearInterval(interval);
    }

    if (status === 'starting') {
      setValue(0);
    }
  }, [status]);

  return <Digits value={value} />;
};
