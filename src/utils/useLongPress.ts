import {
  DOMAttributes,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';

type Config = {
  onLongPress: (event: TouchEvent | MouseEvent) => void;
  onClick?: MouseEventHandler<HTMLElement>;
  shouldPreventDefault?: boolean;
  delay?: number;
};

type UseLongPressProps = Required<
  Pick<
    DOMAttributes<HTMLElement>,
    'onMouseDown' | 'onTouchStart' | 'onMouseUp' | 'onMouseLeave' | 'onTouchEnd'
  >
>;

export const useLongPress = ({
  onLongPress,
  onClick,
  shouldPreventDefault = true,
  delay = 300,
}: Config): UseLongPressProps => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const target = useRef<EventTarget>();

  const start = useCallback(
    (event) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }

      timeout.current = setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      if (
        shouldTriggerClick &&
        !longPressTriggered &&
        (event.button === 0 || event.button === undefined)
      ) {
        onClick?.(event);
      }

      setLongPressTriggered(false);

      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', (e) =>
          preventDefault(e as TouchEvent)
        );
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return {
    onMouseDown: (e) => start(e),
    onTouchStart: (e) => start(e),
    onMouseUp: (e) => clear(e),
    onMouseLeave: (e) => clear(e, false),
    onTouchEnd: (e) => clear(e),
  };
};

const preventDefault = (event: TouchEvent | MouseEvent) => {
  if (!('touches' in event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};
