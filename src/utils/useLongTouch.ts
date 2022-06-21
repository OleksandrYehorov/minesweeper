import { DOMAttributes, useCallback, useRef } from 'react';

type LongTouchProps = Required<
  Pick<
    DOMAttributes<HTMLElement>,
    'onTouchStart' | 'onTouchEnd' | 'onTouchCancel'
  >
>;

export const LONG_TOUCH_DELAY = 500;

export const useLongTouch = (
  onLongPress: (event: React.TouchEvent<HTMLElement>) => void,
  delay = LONG_TOUCH_DELAY,
): LongTouchProps => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const onTouchStart = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      timeout.current = setTimeout(() => onLongPress(event), delay);
    },
    [onLongPress, delay],
  );

  const onTouchEnd = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  return {
    onTouchStart,
    onTouchEnd,
    onTouchCancel: onTouchEnd,
  };
};
