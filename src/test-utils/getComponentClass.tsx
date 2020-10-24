import { StyledComponent } from 'styled-components';

export const getComponentClass = (
  Component: StyledComponent<
    string | React.ComponentType,
    Record<string, unknown>
  >
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
): string => Component?.componentStyle?.componentId ?? '';
