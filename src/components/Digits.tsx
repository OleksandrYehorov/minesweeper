import { FC } from 'react';
import { container, numbers } from './Digits.css';

type Props = {
  value: number;
  'aria-label'?: string;
};

export const Digits: FC<Props> = ({ value, 'aria-label': ariaLabel }) => {
  const width = Math.max(3, String(value).length);
  const ghostNumbers = '8'.repeat(width);

  return (
    <div className={container}>
      <div className={numbers({ ghosted: true })}>{ghostNumbers}</div>
      <div className={numbers()} aria-label={ariaLabel}>
        {value}
      </div>
    </div>
  );
};
