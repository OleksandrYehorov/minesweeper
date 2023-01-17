import { useState, useEffect } from 'react';

export const useSearchParams = <T extends string>(
  key: string,
  initialValue: T,
) => {
  const [value, setValue] = useState<T>(
    () =>
      (new URL(window.location.href).searchParams.get(key) as T) ??
      initialValue,
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, String(value));
    window.history.pushState(null, '', url);
  }, [key, value]);

  return [value, setValue] as const;
};
