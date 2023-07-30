export function disableZoom() {
  document.addEventListener(
    'touchmove',
    (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (event.scale !== 1) {
        event.preventDefault();
      }
    },
    { passive: false },
  );
}
