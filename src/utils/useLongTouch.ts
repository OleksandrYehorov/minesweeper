import { DOMAttributes, useCallback, useMemo, useRef } from 'react';

type LongTouchProps = Required<
  Pick<
    DOMAttributes<HTMLElement>,
    'onTouchStart' | 'onTouchEnd' | 'onTouchCancel'
  >
>;

export const LONG_TOUCH_DELAY = 300;

export const useLongTouch = (
  onLongTouch: (event: React.TouchEvent<HTMLElement>) => void,
  delay = LONG_TOUCH_DELAY,
): LongTouchProps => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const onTouchStart = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      timeout.current = setTimeout(() => onLongTouch(event), delay);
    },
    [delay, onLongTouch],
  );

  const onTouchEnd = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  return useMemo(
    () => ({
      onTouchStart,
      onTouchEnd,
      onTouchCancel: onTouchEnd,
    }),
    [onTouchEnd, onTouchStart],
  );
};
