import { useState, useCallback } from 'react';
import { parse, stringify, Stringifiable, ParsedQuery } from 'query-string';

const setQueryStringWithoutPageReload = (qsValue: string) => {
  const path = `${window.location.protocol}//${window.location.host}${window.location.pathname}${qsValue}`;

  window.history.pushState({ path }, '', path);
};

const getQueryStringValue = (
  key: string,
): ParsedQuery<string | boolean | number>[typeof key] => {
  const values = parse(window.location.search, {
    parseBooleans: true,
    parseNumbers: true,
  });

  return values[key];
};

const setQueryStringValue = <T>(key: string, value: T) => {
  const values = parse(window.location.search);
  const newQsValue = stringify({ ...values, [key]: value });

  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const useQueryString = <T extends Stringifiable>(
  key: string,
  initialValue: T,
): readonly [T, (newValue: T) => void] => {
  const [value, setValue] = useState(getQueryStringValue(key) || initialValue);

  const onSetValue = useCallback(
    (newValue: T) => {
      setValue(newValue);
      setQueryStringValue(key, newValue);
    },
    [key],
  );

  return [value as T, onSetValue];
};
