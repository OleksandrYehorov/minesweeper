interface EventWithPreventDefault {
  preventDefault(): void;
}

export const preventDefault =
  <T extends EventWithPreventDefault>(fn?: (event?: T) => void) =>
  (event?: T): void => {
    event?.preventDefault();
    return fn?.(event);
  };
